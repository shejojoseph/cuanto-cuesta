const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Load environment variables from the .env file
require('dotenv').config();
// changing the config to use .env values

/* const config = {
  host: 'localhost',
  dialect: 'postgres'
}; */

const config = {
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres'
}


/* Here is some hard coded values used . Creating a .env file to do the same */
/*const sequelize = new Sequelize('cuanto-cuesta', 'postgres', 'Admin123', config);*/

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  config
);

const db = {};// message db

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;