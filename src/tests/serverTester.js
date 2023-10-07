const request = require('supertest');

function createServerTester(server) {
  const makeRequest = (httpMethod, httpUrlPath) => {
    switch (httpMethod) {
      case 'HEAD':
        return request(server).head(httpUrlPath);
      case 'GET':
        return request(server).get(httpUrlPath);
      case 'POST':
        return request(server).post(httpUrlPath);
      case 'PUT':
        return request(server).put(httpUrlPath);
      case 'PATCH':
        return request(server).patch(httpUrlPath);
      case 'DELETE':
        return request(server).delete(httpUrlPath);
      default:
        throw Error(`Support for "${httpMethod}" is not implemented.`);
    }
  };

  return {
    makeRequest,
  };
}

module.exports = {
  createServerTester,
};
