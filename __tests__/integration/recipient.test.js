import request from 'supertest';

import tokenSession from '../utils/tokenSession';
import fakerRecipient from '../utils/faker/fakerRecipient';

import app from '../../src/app';
import truncate from '../utils/truncate';

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register recipient', async () => {
    const token = await tokenSession();

    const response = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be allowed to register recipient when token not informed', async () => {
    const response = await request(app)
      .post('/recipients')
      .send(fakerRecipient);

    expect(response.status).toBe(401);
  });

  it('should not be able to register when a mandatory registration has not been entered', async () => {
    const token = await tokenSession();

    const response = await request(app)
      .post('/recipients')
      .send({
        street: 'Rua 1',
        number: '500',
        complement: 'Rua 2',
        state: 'RJ',
        city: 'Três Rios',
        zipcode: '00000-000',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to update recipient when authenticated', async () => {
    const token = await tokenSession();

    const responseRecipients = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/recipients/${responseRecipients.body.id}`)
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to update recipient without authenticated', async () => {
    const token = await tokenSession();

    const responseRecipients = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/recipients/${responseRecipients.body.id}`)
      .send(fakerRecipient);

    expect(response.status).toBe(401);
  });

  it('should not be able to update recipient when invalid token', async () => {
    const token = await tokenSession();

    const responseRecipients = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/recipients/${responseRecipients.body.id}`)
      .send(fakerRecipient)
      .set('Authorization', `Bearer 123`);

    expect(response.status).toBe(401);
  });
});
