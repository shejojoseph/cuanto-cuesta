import db from '../../../src/models'

// Runs once before all tests
beforeAll (async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Test Database connection established successfully.');
  } catch (error) {
    console.log('Unable to connect to test database: ', error);
    process.exit(1);
  }
});

// Runs before each test to ensure isolation
beforeEach (async () => {
  await db.sequelize.sync({ force: true});
});

// Runs once after all tests are done
afterAll (async () => {
  await db.sequelize.close();
  console.log('Test Database connection closed');
})

