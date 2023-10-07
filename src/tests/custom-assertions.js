function expectEqualContactsIgnoringOrder(actualContacts, expectedContacts) {
  expect(actualContacts).toBeInstanceOf(Array);
  const sortedById = (contacts) =>
    [...contacts].sort((c1, c2) => c1.id.localeCompare(c2.id));
  expect(sortedById(actualContacts)).toEqual(sortedById(expectedContacts));
}

module.exports = {
  expectEqualContactsIgnoringOrder,
};
