import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';

import User from '../../src/app/models/User';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Henrique',
      email: 'ihenrits@gmail.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await User.create({
      name: 'Henrique',
      email: 'ihenrits@gmail.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });
});
