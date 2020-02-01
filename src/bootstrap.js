import dotevn from 'dotenv';

dotevn.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
