const { createServer } = require('./server');
const { fakeDatabase } = require('./database/fakeDatabase');

const contacts = require('./database/fakeContactsData');
contacts.forEach((contact) => {
  fakeDatabase.insertIntoContacts(contact);
});

const port = 8080;
const ip = '127.0.0.1';
createServer().listen(port, ip);
