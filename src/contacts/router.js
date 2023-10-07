const {
  urlPathOf,
  respondWith200OkJson,
  respondWith400BadRequest,
  respondWith404NotFound,
  respondWith204NoContent,
} = require('../httpHelpers');
const { fakeDatabase } = require('../database/fakeDatabase');
const { routerHandleResult } = require('../routerHandleResult');
const url = require('url');

function handle(request, response) {
  let requestHandle;

  const parsedUrl = url.parse(request.url, true);
  const pathComponents = parsedUrl.pathname.split('/').filter(Boolean);

  switch (urlPathOf(request)) {
    case '/contacts':
      if (pathComponents[1]) { 
        requestHandle = handleContactById(request, response, pathComponents[1]);
      } else {
        requestHandle = handleContacts(request, response, parsedUrl.query);
      }
      break;

    default:
      respondWith400BadRequest(response);
      return routerHandleResult.HANDLED;
  }
}

function handleContactById(request, response, contactId) {
  switch (request.method) {
    case 'DELETE':
      const contactToDelete = fakeDatabase.selectFromContactsById(contactId);
      if (contactToDelete && contactToDelete.length > 0) {
        fakeDatabase.deleteContactsById(contactId);
        respondWith204NoContent(response);
      } else {
        respondWith404NotFound(response);
      }
      break;

    case 'GET':
      const contact = fakeDatabase.selectFromContactsById(contactId);
      if (contact && contact.length > 0) {
        respondWith200OkJson(response, contact);
      } else {
        respondWith404NotFound(response);
      }
      break;

    default:
      respondWith400BadRequest(response);
  }
  return routerHandleResult.HANDLED;
}

function handleContacts(request, response, queryParams) {
  switch (request.method) {
    case 'GET':
      let contacts = getSortedContacts();

      if (checkForQueryParam(queryParams, 'phrase')) {
        contacts = getContactsNotMatchingPhrase(queryParams.phrase);
      }

      if (checkForQueryParam(queryParams, 'limit') && isNonNegativeInteger(queryParams.limit)) {
        contacts = getContactsWithLimit(contacts, Number(queryParams.limit));
      }
      respondWith200OkJson(response, contacts);
      break;

    default:
      respondWith400BadRequest(response);
  }
  return routerHandleResult.HANDLED;
}

function getContactsNotMatchingPhrase(phrase) {
  const lowerCasePhrase = phrase.toLowerCase();
  return getSortedContacts().filter(contact => !contact.name.toLowerCase().includes(lowerCasePhrase));
}

function getContactsWithLimit(contacts, limit) {
  return contacts.slice(0, limit);
}

function getSortedContacts() {
  return fakeDatabase.selectAllFromContacts().sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
}

/**
 * Check if a query param exists
 */
function checkForQueryParam(queryParams, paramName) {
  return queryParams[paramName] && queryParams[paramName].trim() !== "";
}

/**
 * Copied from the web. The regex expression checks if the number is non-int
 */
function isNonNegativeInteger(value) {
  return /^\d+$/.test(value);
}

module.exports = {
  handle,
};
