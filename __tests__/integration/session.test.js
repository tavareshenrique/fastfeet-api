import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';

import fakerRecipient from '../utils/faker/fakerRecipient';
import fakerSession from '../utils/faker/fakerSession';

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

  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate without email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        password: '123',
      });

    expect(response.status).toBe(400);
  });

  it('should not authenticate withou password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'ihenrits@gmail.com',
      });

    expect(response.status).toBe(400);
  });

  it('should not authenticate when user not found', async () => {
    const response = await request(app)
      .post('/sessions')
      .send(fakerSession);

    expect(response.status).toBe(401);
  });

  it('should not authenticate when password is invalid', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '010203',
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app)
      .post('/recipients')
      .send(fakerRecipient);

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
