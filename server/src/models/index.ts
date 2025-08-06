import fs, { Mode } from 'fs' ;
import path from 'path';
import {Sequelize, DataType, Model, ModelStatic, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import { types } from 'util';
// Load environment variables from the .env file
dotenv.config();

export interface Db{
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Supermercados: ModelStatic<Model<any, any>> & {associate?: (db:Db) =>
    void; findOrCreate?: (options: { where: any, default: any}) =>
      Promise<[any, boolean]> };
  Items: ModelStatic<Model<any, any>> & {associate?: (db:Db) => void; };
  [key: string]: any;
}
// changing the config to use .env values

/* const config = {
  host: 'localhost',
  dialect: 'postgres'
}; */

const config = {
  host: process.env.DB_HOST || 'localhost',
  dialect: (process.env.DB_DIALECT as 'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql') || 'postgres', // Type dialect
};

/* Here is some hard coded values used . Creating a .env file to do the same */
/*const sequelize = new Sequelize('cuanto-cuesta', 'postgres', 'Admin123', config);*/

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  config
);

const db: Db = {} as Db;      // message db

const files = fs.readdirSync(__dirname);
console.log('Files in models directory:', files);

for (const file of files) {
  if (file !== 'index.ts' && file.endsWith('.ts')) {

    const filePath = path.join(__dirname, file);
    console.log(`Attempting to load model from: ${filePath}`); // Debug: Which file is being processed
    try {
      const modelDefiner = require(filePath).default;
      if (typeof modelDefiner === 'function') {
        const model = modelDefiner(sequelize, DataTypes);
        db[model.name] = model;
        console.log(`Successfully loaded model: ${model.name}`); // Debug: Confirm model loaded
      } else {
        console.warn(`File ${file} did not export a function. Skipping.`);
      }
    } catch (e: any) {
      console.error(`Error loading model from ${file}:`, e.message || e); // Debug: Catch errors during loading
    }
  }
}

console.log('Models loaded into db object before associations:', Object.keys(db)); // Debug: What's in db now

for (const model in db) {
  if (db[model].associate && typeof db[model].associate === 'function') db[model].associate(db);
  console.log(`Associated model: ${model}`);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('Final db object keys before export:', Object.keys(db));

export default db;