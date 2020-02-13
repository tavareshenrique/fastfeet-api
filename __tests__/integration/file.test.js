import { resolve } from 'path';

import request from 'supertest';

import app from '../../src/app';
import truncate from '../utils/truncate';

import factory from '../factories';

describe('File', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be register file when authenticated', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .attach('file', resolve(__dirname, '../files', 'IMG_1220.jpg'));

    expect(response.status).toBe(200);
  });

  it('should not be register file when not authenticated', async () => {
    const response = await request(app)
      .post('/files')
      .attach('file', resolve(__dirname, '../files', 'IMG_1220.jpg'));

    expect(response.status).toBe(401);
  });

  it('should not be register file when invalid authenticated', async () => {
    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer 123`)
      .attach('file', resolve(__dirname, '../files', 'IMG_1220.jpg'));

    expect(response.status).toBe(401);
  });
});
