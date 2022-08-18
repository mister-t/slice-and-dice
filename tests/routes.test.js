import request from 'supertest';
import server from '../server.js';

beforeAll((done) => {
  done();
});
afterAll((done) => {
  server.close(() => done());
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
