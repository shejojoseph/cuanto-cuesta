import app from './app';       // Import the default configured app
import dotenv from 'dotenv';
import db from './models'


dotenv.config();

/* using ES6 import syntax
const express = require('express')
const router = require('./routes/items.routes.js');
const db = require('./models/index');
var cors = require('cors') */

const port = process.env.PORT || 3000;

(async function bootstrap() {
  try{
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}) ();

