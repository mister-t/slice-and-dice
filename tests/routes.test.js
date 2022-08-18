import request from 'supertest';
import server from '../server.js';
import { connectDB, closeConn, clearColl } from '../config/db.js';

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
    const res = await request(server).post('/api/salaries').send({
      name: 'Test User',
      salary: 100000,
      currency: 'USD',
      on_contract: true,
      department: 'Engineering',
      sub_deparment: 'Platform',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('salary');
  });
});
