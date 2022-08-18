import request from 'supertest';
import server from '../server.js';
import { connectDB, closeConn, clearColl } from '../config/db.js';
import {
  ERR_MSG_CREATE,
  ERR_MSG_UNKNOWN_ROUTE,
} from '../constants/errorMessages.js';

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => await clearColl());

afterAll(async () => {
  await closeConn();
  await server.close();
});

describe('Salary Summary Statistics endpoints', () => {
  it('should create a new salary entry', async () => {
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

  it('should return a route-not-found error when an unknown route is accessed', async () => {
    const res = await request(server).get('/api/unknownRoute');
    expect(res.status).toEqual(404);
    expect(res.text).toMatch(ERR_MSG_UNKNOWN_ROUTE);
  });
});
