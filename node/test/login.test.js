const request = require('supertest');
const app = require('../app');
const loginUtils = require('./util/login');

describe('/login', () => {
  let user;

  beforeEach(async () => {
    user = await loginUtils.createUser("bob@example.com", "p4ssw0rd");
    user.password = "p4ssw0rd";
  });

  it('creates a session when given the correct password', async () => {
    const existingUserSession = await loginUtils.findUserSession(user.id);
    expect(existingUserSession).toBeNull();
    const res = await request(app)
      .post('/login')
      .send({
        email: "bob@example.com",
        password: "p4ssw0rd"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('authToken');
    const userSession = await loginUtils.findUserSession(user.id);
    expect(userSession).toHaveProperty('authToken');
    expect(res.body.authToken).toEqual(userSession.authToken);
  });

  /*it('does not create a session when given an incorrect password', async () => {

  });*/
});
