const request = require('supertest');
const app = require('../lib/app');
const commonUtils = require('./util/common');

describe('POST /logout', () => {
  let authToken;
  beforeEach(async () => {
    await commonUtils.deleteUser('bob@example.com');
    authToken = await commonUtils.createLoggedInUser(request(app));
  });

  afterAll(async () => {
    await commonUtils.closeDbConnection();
  });

  it('should end a users session when given a valid auth token', async () => {
    const res = await request(app)
      .post('/logout')
      .set('X-Auth-Token', authToken)
      .send();
    expect(res.statusCode).toEqual(204);
  });

  it('should return a 401 when no auth token is provided', async () => {
    const res = await request(app)
      .post('/logout')
      .send();
    expect(res.statusCode).toEqual(401);
  });
});
