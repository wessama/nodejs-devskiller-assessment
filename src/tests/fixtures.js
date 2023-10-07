let nextId;

const resetFixturesIdGenerator = () => {
  nextId = 1;
};
resetFixturesIdGenerator();

const contactFixture = (overrides = {}) => ({
  id: `${nextId++}`,
  name: 'any contact name',
  phone: 'any contact phone',
  addressLines: [
    'any contact address line 1',
    'any contact address line 2',
    'any contact address line 3',
  ],
  ...overrides,
});

module.exports = {
  resetFixturesIdGenerator,
  contactFixture,
};
