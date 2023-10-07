const { respondWith200OkText } = require('../httpHelpers');
const { urlPathOf } = require('../httpHelpers');
const { routerHandleResult } = require('../routerHandleResult');

function handle(request, response) {
  if (urlPathOf(request) !== '/ping') {
    return routerHandleResult.NO_URL_PATH_MATCH;
  }

  if (request.method !== 'GET') {
    return routerHandleResult.NO_HTTP_METHOD_MATCH;
  }

  respondWith200OkText(response, 'pong');
  return routerHandleResult.HANDLED;
}

module.exports = {
  handle,
};
