const { expectEqualContactsIgnoringOrder } = require('../custom-assertions');
const { contactFixture } = require('../fixtures');
const { fakeDatabase } = require('../../database/fakeDatabase');
const { createServerTester } = require('../serverTester');
const { createServer } = require('../../server');

describe('DELETE /contacts/<contact-id>', () => {
  let server;

  beforeEach(() => {
    fakeDatabase.clear();
    server = createServerTester(createServer());
  });

  test('delete Contact by its ID', async () => {
    // given
    const contact1 = contactFixture({ id: '111' });
    const contact2 = contactFixture({ id: '222' });
    const contact3 = contactFixture({ id: '333' });
    fakeDatabase.insertIntoContacts(contact1);
    fakeDatabase.insertIntoContacts(contact2);
    fakeDatabase.insertIntoContacts(contact3);

    // when
    await server.makeRequest('DELETE', '/contacts/222');

    // and then
    expectEqualContactsIgnoringOrder(fakeDatabase.data().contacts, [
      contact1,
      contact3,
    ]);
  });
});
