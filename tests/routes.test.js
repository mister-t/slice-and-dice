import request from 'supertest';
import server from '../server.js';
import { connectDB, closeConn, clearColl } from '../config/db.js';
import { importData } from '../data/dbSeeder.js';

import {
  ERR_MSG_CREATE,
  ERR_MSG_UNKNOWN_ROUTE,
} from '../constants/errorMessages.js';

beforeAll(async () => {});

// afterEach(async () => await clearColl());

afterAll(async () => {
  await closeConn();
  await server.close();
});

describe('Salary Summary Statistics endpoints', () => {
  it('should have not have an empty database when the server started', async () => {
    const res = await request(server).get('/api/salaries');
    const { length } = Object.keys(res.body);
    expect(length).toBeGreaterThan(0);
    expect(res.status).toEqual(200);
  });

  it('should return the summary statistics of mean, min, and max', async () => {
    const currencies = ['USD', 'EUR', 'INR'];
    const res = await request(server).get('/api/salaries/statistics');
    const { stats } = res.body;
    // console.log(stats);
    expect(stats.length).toBeGreaterThan(0);
    expect(res.status).toEqual(200);
    stats.forEach((stat) => {
      const { _id, mean, max, min } = stat;

      if (_id === 'INR') {
        expect(currencies.includes(_id)).toBeTruthy();
        expect(mean).toEqual(200000000);
        expect(max).toEqual(200000000);
        expect(min).toEqual(200000000);
      } else if (_id === 'USD') {
        expect(currencies.includes(_id)).toBeTruthy();
        expect(mean).toBeGreaterThan(83584);
        expect(max).toEqual(240000);
        expect(min).toEqual(30);
      } else {
        expect(currencies.includes(_id)).toBeTruthy();
        expect(mean).toEqual(70000);
        expect(max).toEqual(70000);
        expect(min).toEqual(70000);
      }
    });
  });

  it('should create a new employee salary entry', async () => {
    const res = await request(server)
      .post('/api/salaries')
      .send({
        name: 'Test User',
        salary: 100000,
        currency: 'USD',
        on_contract: true,
        department: 'Engineering',
        sub_deparment: 'Platform',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const { body } = res;
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('salary');
    expect(body).toHaveProperty('currency');
    expect(body).toHaveProperty('department');
  });

  it('should return an error code and message when it fails to create a new salary entry', async () => {
    const res = await request(server).post('/api/salaries').send({
      name: 'Test User',
      salary: 100000,
    });
    expect(res.status).toEqual(400);
    expect(res.text).toMatch(ERR_MSG_CREATE);
  });

  it('should delete an employee salary entry', async () => {
    const res = await request(server)
      .post('/api/salaries')
      .send({
        name: 'User to be deleted',
        salary: 100000,
        currency: 'USD',
        department: 'Engineering',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toHaveProperty('_id');

    const deletedRes = await request(server)
      .delete(`/api/salaries/${res.body._id}`)
      .expect(204);
  });

  it('should return an error message if employee ID is non-existent', async () => {
    const res = await request(server)
      .post('/api/salaries')
      .send({
        name: 'User to be deleted',
        salary: 100000,
        currency: 'USD',
        department: 'Engineering',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    expect(res.body).toHaveProperty('_id');

    const deletedRes = await request(server)
      .delete(`/api/salaries/62fecce0e483dfcfxxxxxxxx`)
      .expect(400);
    expect(deletedRes).toHaveProperty('text');
    const text = JSON.parse(deletedRes.text);
    expect(text).toHaveProperty('message');
  });

  it('should return a route-not-found error when an unknown route is accessed', async () => {
    const res = await request(server).get('/api/unknownRoute');
    expect(res.status).toEqual(404);
    expect(res.text).toMatch(ERR_MSG_UNKNOWN_ROUTE);
  });
});
