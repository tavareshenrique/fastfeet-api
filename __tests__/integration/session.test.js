import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';

import factory from '../factories';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });
});
