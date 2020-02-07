import request from 'supertest';

import fakerRecipient from '../utils/faker/fakerRecipient';

import app from '../../src/app';
import truncate from '../utils/truncate';

import factory from '../factories';

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register recipient', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be allowed to register recipient when token not informed', async () => {
    const response = await request(app)
      .post('/recipients')
      .send(fakerRecipient);

    expect(response.status).toBe(401);
  });

  it('should be able to update recipient when authenticated', async () => {
    const user = await factory.create('User');

    const responseRecipientsPost = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const responseRecipientsPut = await request(app)
      .put(`/recipients/${responseRecipientsPost.body.id}`)
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(responseRecipientsPut.status).toBe(200);
  });

  it('should not be able to update recipient without authenticated', async () => {
    const user = await factory.create('User');

    const responseRecipients = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const response = await request(app)
      .put(`/recipients/${responseRecipients.body.id}`)
      .send(fakerRecipient);

    expect(response.status).toBe(401);
  });

  it('should not be able to update recipient when invalid token', async () => {
    const user = await factory.create('User');

    const responseRecipients = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const response = await request(app)
      .put(`/recipients/${responseRecipients.body.id}`)
      .send(fakerRecipient)
      .set('Authorization', `Bearer 123`);

    expect(response.status).toBe(401);
  });

  it('should not register a recipient when field is required', async () => {
    const user = await factory.create('User');
    const { street } = fakerRecipient;

    const response = await request(app)
      .post('/recipients')
      .send({
        street,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not update a recipient when field is required', async () => {
    const user = await factory.create('User');
    const { street } = fakerRecipient;

    const recipientPostResponse = await request(app)
      .post('/recipients')
      .send(fakerRecipient)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const response = await request(app)
      .put(`/recipients/${recipientPostResponse.body.id}`)
      .send({
        street,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
});
