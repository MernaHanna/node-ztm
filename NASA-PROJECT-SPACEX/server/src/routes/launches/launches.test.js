const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('LaunchesAPI', () => {
  // add beforeAll to add configurations before running tests
  // run once to set up all the tests that comes after
  beforeAll(async () => {
    await mongoConnect();
  });

  // we need to stop the connection to mongo after all tests have finished
  // to make sure that the connection is closed so that we don't have an async function and a connection running forever
  afterAll(async () => {
    await mongoDisconnect();
  });

  // create test fixture with different test cases
  describe('Test GET /launches', () => {
    // async await approach is much better than the callback promise approach
    test('It should respond with 200 success', async () => {
      // supertest requires the app variable (express app defined in app.js)
      // const response = await request(app).get('/launches');
      // expect(response.statusCode).toBe(200);
      // when testing http requests we may use supertest chaining method expect
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST /launches', () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'January 4, 2028',
    };

    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
    };

    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'zoot',
    };

    test('It should respond with 201 created', async () => {
      // const response = 200;
      // expect(response).toBe(200);
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      // the date in the request has different format than the date in the response
      // we need to make sure they refer to the same date eventhough in different formats
      const requestDate = new Date(completeLaunchData.launchDate).valueOf(); // to get the numerical value of the date
      const responseDate = new Date(response.body.launchDate).valueOf();

      // toBe is used to check for primitive values
      expect(responseDate).toBe(requestDate);

      // when we check the response body we don't use the supertest but instead we use the jest functions
      // toMatchObject is used to check that a JavaScript object matches a subset of the properties of an object (partially equal)
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

      // to test that objects have the same structure and type
      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

      // to test that objects have the same structure and type
      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });
});
