import crypto from 'crypto';

class GenerateIdService {
  async run() {
    const id = await crypto.randomBytes(4).toString('HEX');
    return id.toUpperCase();
  }
}

export default new GenerateIdService();
