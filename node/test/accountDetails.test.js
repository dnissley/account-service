const request = require('supertest');
const app = require('../app');
const commonUtils = require('./util/common');

describe('GET /login', () => {
  let authToken;
  beforeEach(async () => {
    await commonUtils.deleteUser('bob@example.com');
    authToken = await commonUtils.createLoggedInUser(request(app));
  });

  afterAll(async () => {
    await commonUtils.closeDbConnection();
  });

  it('should return a payload with the users email address when given a valid auth token', async () => {
    const res = await request(app)
      .get('/account')
      .set('X-Auth-Token', authToken)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual('bob@example.com');
  });

  it('should return a 401 when the wrong auth token is provided', async () => {
    const res = await request(app)
      .get('/account')
      .set('X-Auth-Token', 'invalid-auth-token')
      .send();
    expect(res.statusCode).toEqual(401);
  });

  it('should return a 401 when no auth token is provided', async () => {
    const res = await request(app)
      .get('/account')
      .send();
    expect(res.statusCode).toEqual(401);
  });
});
