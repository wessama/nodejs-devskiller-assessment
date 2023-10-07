const { createServerTester } = require('./serverTester');
const { createServer } = require('../server');

let server;

describe('server', () => {
  beforeEach(() => {
    server = createServerTester(createServer());
  });

  test('404 Not Found is returned for unexpected endpoint', async () => {
    await server.makeRequest('GET', '/non-existent-endpoint-route').expect(404);
  });
});
