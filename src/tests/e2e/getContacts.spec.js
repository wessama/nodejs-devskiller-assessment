const { expectEqualContactsIgnoringOrder } = require('../custom-assertions');
const { contactFixture } = require('../fixtures');
const { fakeDatabase } = require('../../database/fakeDatabase');
const { createServerTester } = require('../serverTester');
const { createServer } = require('../../server');

describe('GET /contacts', () => {
  let server;

  beforeEach(() => {
    fakeDatabase.clear();
    server = createServerTester(createServer());
  });

  test('get all Contacts', async () => {
    // given
    const contact1 = contactFixture({
      id: '123',
      name: 'Contact 123',
      phone: '111-222-333',
      addressLines: ['Fancy Street', 'Mega City', 'What-a-Country'],
    });
    const contact2 = contactFixture({
      id: '234',
      name: 'Contact 234',
      phone: '222-333-444',
      addressLines: ['Lake Cottage', 'Waters', 'Sealand'],
    });
    fakeDatabase.insertIntoContacts(contact1);
    fakeDatabase.insertIntoContacts(contact2);

    // when
    await server
      .makeRequest('GET', '/contacts')
      // then
      .expect((res) => {
        expectEqualContactsIgnoringOrder(res.body, [contact1, contact2]);
      });
  });

  test('Contacts are sorted by name', async () => {
    // given
    const contactA = contactFixture({
      id: 'A',
      name: 'name A',
    });
    const contactB = contactFixture({
      id: 'B',
      name: 'name B',
    });
    fakeDatabase.insertIntoContacts(contactA);
    fakeDatabase.insertIntoContacts(contactB);

    // when
    await server
      .makeRequest('GET', '/contacts')
      // then
      .expect([contactA, contactB]);
  });

  test('number of returned Contacts can be limited to a requested number', async () => {
    // given
    const contactA = contactFixture({ name: 'A' });
    const contactB = contactFixture({ name: 'B' });
    const contactC = contactFixture({ name: 'C' });
    fakeDatabase.insertIntoContacts(contactA);
    fakeDatabase.insertIntoContacts(contactB);
    fakeDatabase.insertIntoContacts(contactC);

    // when
    await server
      .makeRequest('GET', '/contacts?limit=2')
      // then
      .expect([contactA, contactB]);
  });

  ['-1', '2.3', 'x'].forEach((invalidLimit) => {
    test(`invalid limit for returned Contacts results with 400 Bad Request (case: "${invalidLimit}")`, async () => {
      // given any Contacts
      fakeDatabase.insertIntoContacts(contactFixture());
      fakeDatabase.insertIntoContacts(contactFixture());

      // when
      await server
        .makeRequest('GET', `/contacts?limit=${invalidLimit}`)
        // then
        .expect(400);
    });
  });

  ['X', 'ddd', 'e f'].forEach((phrase) => {
    test(`Contacts can filtered by a name part phrase (case "${phrase}")`, async () => {
      // given
      const matchingContact = contactFixture({ name: 'aXc ddd e f' });
      const nonMatchingContact = contactFixture({ name: 'ac dd e  f' });
      fakeDatabase.insertIntoContacts(matchingContact);
      fakeDatabase.insertIntoContacts(nonMatchingContact);

      // when
      await server
        .makeRequest('GET', `/contacts?phrase=${phrase}`)
        // then
        .expect([matchingContact]);
    });
  });

  test(`empty Contact name phrase results with 400 Bad Request`, async () => {
    // given any Contacts
    fakeDatabase.insertIntoContacts(contactFixture());
    fakeDatabase.insertIntoContacts(contactFixture());

    // when
    await server
      .makeRequest('GET', '/contacts?phrase=')
      // then
      .expect(400);
  });
});
