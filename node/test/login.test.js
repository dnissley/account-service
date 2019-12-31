const request = require('supertest');
const app = require('../lib/app');
const commonUtils = require('./util/common');

describe('POST /login', () => {
  let user;

  beforeEach(async () => {
    user = await commonUtils.createUser('bob@example.com', 'p4ssw0rd');
    user.password = 'p4ssw0rd';
  });

  afterAll(async () => {
    await commonUtils.closeDbConnection();
  });

  it('creates a session when given the correct password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bob@example.com',
        password: 'p4ssw0rd'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('authToken');
    const userSession = await commonUtils.findUserSession(user.id);
    expect(userSession).toHaveProperty('authToken');
    expect(res.body.authToken).toEqual(userSession.authToken);
  });

  it('does not create a session when given an incorrect password', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bob@example.com',
        password: 'wrong_password'
      });
    expect(res.statusCode).toEqual(401);
    const userSession = await commonUtils.findUserSession(user.id);
    expect(userSession).toBeNull();
  });

  it('returns a 401 when given an email address that is not associated with an account', async () => {
    await commonUtils.deleteUser("bob@example.com");
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bob@example.com',
        password: 'p4ssw0rd'
      });
    expect(res.statusCode).toEqual(401);
  });

  it('returns 400 for validation errors', async () => {
    await commonUtils.deleteUser("bob@example.com");
    const res = await request(app)
      .post('/login')
      .send({
        email: 1111111,
        password: 'p4ssw0rd'
      });
    expect(res.statusCode).toEqual(400);
  });
});
