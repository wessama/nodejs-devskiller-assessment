const { contactFixture } = require('../fixtures');
const { fakeDatabase } = require('../../database/fakeDatabase');
const { createServerTester } = require('../serverTester');
const { createServer } = require('../../server');

describe('GET /contacts/<contact-id>', () => {
  let server;

  beforeEach(() => {
    fakeDatabase.clear();
    server = createServerTester(createServer());
  });

  test('get Contact by its ID', async () => {
    // given
    const contact = contactFixture({
      id: '123',
      name: 'Contact 123',
      phone: '0-123-456-789',
      addressLines: ['Fancy Street', 'Mega City', 'What-a-Country'],
    });
    fakeDatabase.insertIntoContacts(contact);

    // when
    await server
      .makeRequest('GET', '/contacts/123')
      // then
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect(contact);
  });

  describe('get non-existent Contact by its ID', () => {
    test('HTTP status', async () => {
      // given
      fakeDatabase.insertIntoContacts(contactFixture({ id: '123' }));

      // when
      await server
        .makeRequest('GET', '/contacts/987')
        // then
        .expect(404);
    });
  });
});
