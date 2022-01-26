require('dotenv').config();
const request = require('supertest');
const { mongoDB } = require('../server/config/db-config');
const app = require('../app');

console.log('NODE_ENV', process.env.NODE_ENV);

describe('test suit', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll((done) => {
    mongoDB.disconnect(() => {
      console.log('mongodb disconnected...');
      done();
    });
  });

  it('test case', () => {
    expect(true).toBe(true);
  });

  test('It should response the GET method', () =>
    request(app).get('/').expect(200));
});
