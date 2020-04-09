import request from 'supertest';

import faker from 'faker';
import app from '../../src/app';
import truncate from '../utils/truncate';
import Cache from '../../src/lib/Cache';

import factory from '../factories';

import fakerProblem from '../utils/faker/fakerProblem';
import fakerDeliveryman from '../utils/faker/fakerDeliveryman';
import fakerRecipient from '../utils/faker/fakerRecipient';

describe('DeliveryProblems', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be list all delivery problems', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/delivery/problems')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should list the problem by order', async () => {
    const user = await factory.create('User');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .send(fakerDeliveryman)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const recipient = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const order = await request(app)
      .post('/orders')
      .send({
        product: faker.commerce.product(),
        recipient_id: recipient.body.id,
        deliveryman_id: deliveryman.body.id,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    await request(app)
      .post(`/delivery/${order.body.id}/problems`)
      .send(fakerProblem)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const response = await request(app)
      .get(`/delivery/${order.body.id}/problems`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should return cache', async () => {
    const user = await factory.create('User');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .send(fakerDeliveryman)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const recipient = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const order = await request(app)
      .post('/orders')
      .send({
        product: faker.commerce.product(),
        recipient_id: recipient.body.id,
        deliveryman_id: deliveryman.body.id,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const response = await request(app)
      .get(`/delivery/${order.body.id}/problems`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const cached = await Cache.get('problems');

    expect(response.body[0].id).toBe(cached[0].id);
  });

  it('should cache the list of delivery issues', async () => {
    const user = await factory.create('User');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .send(fakerDeliveryman)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const recipient = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const order = await request(app)
      .post('/orders')
      .send({
        product: faker.commerce.product(),
        recipient_id: recipient.body.id,
        deliveryman_id: deliveryman.body.id,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    await request(app)
      .post(`/delivery/${order.body.id}/problems`)
      .send(fakerProblem)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const deliveryProblems = await request(app)
      .get(`/delivery/${order.body.id}/problems`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(deliveryProblems.body[0]).toHaveProperty('id');
  });
});
