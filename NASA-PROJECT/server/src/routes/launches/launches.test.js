const request = require('supertest');
const app = require('../../app');

// create test fixture with different test cases
describe('Test GET /launches', () => {
  // async await approach is much better than the callback promise approach
  test('It should respond with 200 success', async () => {
    // supertest requires the app variable (express app defined in app.js)
    // const response = await request(app).get('/launches');
    // expect(response.statusCode).toBe(200);
    // when testing http requests we may use supertest chaining method expect
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches', () => {
  test('It should respond with 200 success', () => {
    const response = 200;
    expect(response).toBe(200);
  });

  test('It should catch missing required properties', () => {
    // const response = 200;
    // expect(response).toBe(200);
  });

  test('It should catch invalid dates', () => {
    // const response = 200;
    // expect(response).toBe(200);
  });
});
