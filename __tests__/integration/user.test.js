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

  it('should be update user when authenticaded', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put('/users')
      .send({
        name: fakerUser.name,
        email: fakerUser.email,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to register when user already exists in update', async () => {
    const userOne = await factory.create('User', {
      email: fakerUser.email,
    });

    const userTwo = await factory.create('User');

    const response = await request(app)
      .put('/users')
      .send({
        name: userTwo.name,
        email: userOne.email,
      })
      .set('Authorization', `Bearer ${userTwo.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to change password when old password does not match', async () => {
    const user = await factory.create('User');

    const { name, email } = user;

    const response = await request(app)
      .put('/users')
      .send({
        name,
        email,
        oldPassword: 'abc123',
        password: '123456',
        confirmPassword: '123456',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should not register a user when field is required', async () => {
    const { email, password } = fakerUser;

    const response = await request(app)
      .post('/users')
      .send({
        email,
        password,
      });

    expect(response.status).toBe(400);
  });

  it('should not update a password when confirmPassword field is required', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put('/users')
      .send({
        password: '123456',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not update user when oldPassword exists and password field is required', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '123456',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not update when oldPassword is less than 6 characters', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '123',
        password: '654321',
        confirmPassword: '654321',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
});
