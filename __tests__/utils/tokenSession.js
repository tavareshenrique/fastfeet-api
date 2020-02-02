import request from 'supertest';
import factory from '../factories';

import app from '../../src/app';

async function tokenSession() {
  const user = await factory.create('User');

  const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: user.password,
    });

  return response.body.token;
}

module.exports = tokenSession;
