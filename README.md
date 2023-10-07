# Introduction

You are developing a REST back end of an address book app. You were asked to
implement endpoints to fetch a list of contacts (with phase matching and results
limiting) and to fetch details of a single contact and to delete a given contact.

As the database is not ready, you are provided with a fake database layer exported
with `./src/database/fakeDatabase.js`.

## App requirements

Your implementation has to:

- make all tests pass,
- modify helper functions if needed,
- fulfil the requirements of HTTP endpoints described below:

### GET /contacts

- The response HTTP status should be: `200 OK`.
- The response `Content-Type` header should be: `application/json`.
- The response body should be: a JSON array with details of all contacts as loaded from the database (each contact has an `ID`, a `name`, a `phone` and an array of strings `addressLines`).
- The contacts in the response body are sorted by their name, which means a contact with
  the name of `Abbigail Wunsch` would be first and a contact with the name of `Zoila Daugherty II` would be last.
- If the `phrase` URL query parameter is present:
  - in the response body, filter out contacts with names not matching `phrase`;
  - the `phrase` and the contact's `name` are compared lowercase, which means that both
    `Theresa Gorczany` and `Zakary Mayer` match the following `phrase=zA`;
  - If there are no contacts matching the `phrase`, then the response body contains only an empty JSON array as there are no contacts to include in it.
  - If the `phrase` is empty (`phrase=`), then the response has the `400 Bad Request` HTTP
    status and an empty response body.
- If the `limit` URL query parameter is present:
  - the number of the returned contacts should be limited by the `limit` number;
    - e.g., if there are 3 contacts matching the `phrase` parameter and the `limit` is 10,
      then those 3 contacts are included in the response body;
    - e.g., if there are 10 contacts matching the `phrase` parameter and the `limit` is 3,
      then only the first 3 contacts (sorted by name) are included.
  - If the `limit` is not a valid non-negative integer (`0`, `1`, `2` and so on),
    then the response has the `400 Bad Request` HTTP status and an empty response body.

### GET /contacts/<contact-id>

- If a contact with `ID` value `<contact-id>` exists:
  - the response HTTP status should be: `200 OK`;
  - the response `Content-Type` header should be: `application/json`;
  - the response body should be: a JSON object with details of that contact loaded from
    the database (`ID`, `name`, `phone` and an array of strings `addressLines`).
- If a contact with `ID` value `<contact-id>` does not exist:
  - the response HTTP status should be: `404 Not Found`.

### DELETE /contacts/<contact-id>

- If a contact with `ID` value `<contact-id>` exists:
  - the response HTTP status should be: `204 No Content`;
  - that contact is deleted, which means it is no longer included in the response to
    `GET /contacts` requests and its details are no longer available when making
    the `GET /contacts/<contact-id>` request.
- If a contact with `ID` value `<contact-id>` does not exist:
  - the response HTTP status should be: `404 Not Found`.

### GET /ping (has already been implemented)

- The response HTTP status should be: `200 OK`.
- The response `Content-Type` header should be: `text/plain`.
- The response body should be: `pong`.

### For all requests

- The request to the URL path different than the expected ones would get the `404 Not Found` HTTP status.
- The request to the supported URL path, but with an unexpected HTTP method would get the
  `405 Method Not Allowed` HTTP status.

## Setup

This app was originally created with Node.js 12.13.1 / npm 6.12.1. You can use
[nvm](https://github.com/creationix/nvm) to make sure you are working with the same
version of Node.js. Run `nvm install` and nvm will set up Node.js based on
the `.nvmrc` file.

Follow these steps to set up the app:

1. `npm install` – install dependencies.
2. `npm test` – run all tests (should fail unless you implement the task).
3. `npm start` – serve the app at
   [http://localhost:8080/](http://localhost:8080/) (you can check if it works
   by opening the [http://localhost:8080/ping](http://localhost:8080/ping) in your
   browser or executing the `curl http://localhost:8080/ping` in your terminal –
   `pong` should be printed).

There is also the `npm run test:watch` command available to start the test runner in
the watch mode. It runs tests related to modified files only.

You can also use the `npm run start:watch` command to serve the app in the watch
mode. It restarts the server every time the code is modified.
