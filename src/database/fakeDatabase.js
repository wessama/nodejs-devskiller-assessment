const cloneDeep = require('lodash/cloneDeep');

const initialData = {
  contacts: [],
};

let sharedGlobalData = {};

const fakeDatabase = {
  data: () => sharedGlobalData,

  clear: () => {
    sharedGlobalData = cloneDeep(initialData);
  },

  insertIntoContacts: (contact) => {
    if (sharedGlobalData.contacts.find((c) => c.id === contact.id)) {
      throw Error("It's forbidden to persist contact of non-unique ID.");
    }
    sharedGlobalData.contacts.push(cloneDeep(contact));
  },

  deleteContactsById: (contactId) => {
    sharedGlobalData.contacts = sharedGlobalData.contacts.filter(
      (c) => c.id !== contactId,
    );
  },

  selectAllFromContacts: () => {
    return cloneDeep(sharedGlobalData.contacts);
  },

  selectFromContactsById: (contactId) => {
    return cloneDeep(
      sharedGlobalData.contacts.filter((c) => c.id === contactId),
    );
  },
};

fakeDatabase.clear();

module.exports = { fakeDatabase };
