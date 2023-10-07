function createServer() {
  const http = require('http');
  const router = require('./router');

  return http.createServer(router);
}

module.exports = {
  createServer,
};
