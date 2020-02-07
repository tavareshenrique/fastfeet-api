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
    const { email, password } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'adm@dastfeet.com',
        password: '098123',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const { email, password } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate when user not found', async () => {
    const response = await request(app)
      .post('/sessions')
      .send(fakerSession);

    expect(response.status).toBe(401);
  });

  it('should not authenticate when password is invalid', async () => {
    const { email } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
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

  it('should not authenticate when field is required', async () => {
    const { email } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
      });

    expect(response.status).toBe(400);
  });
});
