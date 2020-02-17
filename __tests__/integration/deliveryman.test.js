import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';

import fakerDeliveryman from '../utils/faker/fakerDeliveryman';

import factory from '../factories';

describe('Deliveryman', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be register deliveryman when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/deliverymen')
      .send(fakerDeliveryman)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should be list all deliverymen when authenticated', async () => {
    await factory.create('Deliverymen');
    const user = await factory.create('User');

    const response = await request(app)
      .get('/deliverymen')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should be update deliverymen when authenticated', async () => {
    const { id } = await factory.create('Deliverymen');
    const user = await factory.create('User');

    const response = await request(app)
      .put(`/deliverymen/${id}`)
      .send(fakerDeliveryman)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be update deliverymen when user deliveryman already exists', async () => {
    const deliveryman1 = await factory.create('Deliverymen', {
      email: 'ihenrits@gmail.com',
    });
    const deliveryman2 = await factory.create('Deliverymen');

    const user = await factory.create('User');

    const response = await request(app)
      .put(`/deliverymen/${deliveryman2.id}`)
      .send({
        name: deliveryman2.name,
        email: deliveryman1.email,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should be remove deliverymen when authenticated', async () => {
    const { id } = await factory.create('Deliverymen');
    const user = await factory.create('User');

    const response = await request(app)
      .delete(`/deliverymen/${id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
});
