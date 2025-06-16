//import { Sequelize } from "./models";
//import { Sequelize } from 'sequelize';
import { describe, beforeAll, it, expect, jest } from '@jest/globals';
import db, { sequelize } from './models/index';
import { Sequelize as SequelizeClass } from 'sequelize';
//import { sequelize } from './models';

describe('src/models/index.js', () => {
  let db = {
    sequelize: SequelizeClass,
    Sequelize: typeof SequelizeClass,
  }

  beforeAll(() => {
    process.env.DB_HOST = 'localhost',
    process.env.DB_DIALECT = 'sqlite', // here we use sqlite in-memory for tests

    process.env.DB_NAME = 'test_db',
    process.env.DB_USER = 'test_user',
    process.env.DB_PASS = 'test_pass',

    // Clear Node's module cache so that index.ts is reloaded with new env
    jest.resetModules();
    db = require('./models/index').default;
  });

  it('should export a Sequelize instance and the Sequelize class', () => {
    expect(db.sequelize).toBeInstanceOf(SequelizeClass); // // expects sequelize should be an instance of Sequelize

    expect(db.Sequelize).toBe(SequelizeClass); // expects the Sequelize property should reference the Sequelize class itself
  })
})