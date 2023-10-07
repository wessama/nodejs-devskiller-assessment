const request = require('supertest');
const { createServer } = require('../../server');

describe('GET /ping', () => {
  test('200 OK with "pong" body is returned', async () => {
    await request(createServer())
      .get('/ping')
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('pong');
  });
});
