import request from 'supertest';

import fakerUser from '../utils/faker/fakerUser';

import app from '../../src/app';
import truncate from '../utils/truncate';

import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send(fakerUser);

    expect(response.body).toHaveProperty('id');
  });

  it('should be not able to register when name not been entered', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'ihenrits@gmail.com',
        password: '123',
      });

    expect(response.status).toBe(400);
  });

  it('should be not able to register when email or password not been entered', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Henrique Tavares',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to register when user already exists', async () => {
    const { name, email, password } = await factory.create('User');

    const response = await request(app)
      .post('/users')
      .send({
        name,
        email,
        password,
      });

    expect(response.status).toBe(400);
  });
});
