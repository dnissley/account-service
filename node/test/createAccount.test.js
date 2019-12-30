const request = require('supertest');
const app = require('../app');
const commonUtils = require('./util/common');

describe('POST /account', () => {
  beforeEach(async () => {
    await commonUtils.deleteUser('bob@example.com');
  });

  afterAll(async () => {
    await commonUtils.closeDbConnection();
  });

  it('creates an account and a session when given a valid payload', async () => {
    const res = await request(app)
      .post('/account')
      .send({
        email: 'bob@example.com',
        password: 'p4ssw0rd'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('authToken');
    const userSession = await commonUtils.findUserSession('bob@example.com');
    expect(userSession).toHaveProperty('authToken');
    expect(res.body.authToken).toEqual(userSession.authToken);
  });

  it('returns a 400 when given an email that already has an account', async () => {
    const existingUser = await commonUtils.createUser('bob@example.com', 'some_password');
    const res = await request(app)
      .post('/account')
      .send({
        email: 'bob@example.com',
        password: 'p4ssw0rd'
      });
    expect(res.statusCode).toEqual(400);
    const foundUser = await commonUtils.findUser('bob@example.com');
    expect(foundUser.id).toEqual(existingUser.id);
    expect(foundUser.passwordHash).toEqual(existingUser.passwordHash);
  });

  it('returns a 400 for passwords less than 8 characters', async () => {
    const res = await request(app)
      .post('/account')
      .send({
        email: 'bob@example.com',
        password: '1234567'
      });
    expect(res.statusCode).toEqual(400);
  });
});
