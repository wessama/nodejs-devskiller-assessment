const { resetFixturesIdGenerator } = require('./fixtures');

jest.setTimeout(500);

beforeEach(() => {
  resetFixturesIdGenerator();
});
