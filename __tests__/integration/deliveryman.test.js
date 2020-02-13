import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';

import factory from '../factories';

describe('Deliveryman', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be register deliveryman when authenticated', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/deliverymen')
      .send({
        name: 'João',
        email: 'joao@gmail.com',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    console.log(response.error);

    expect(response.status).toBe(200);
  });
});
