import fs from 'fs'
import path from 'path'
import {parse} from 'csv/sync'
import dotenv from 'dotenv'

const environment = process.argv[2] || 'development';
const envPath = environment === 'test' ? '.env.test' : '.env';

dotenv.config({path: path.resolve(process.cwd(), envPath)});

import db from '../src/models';

async function seedDatabase() {
  console.log(`Starting to seed the '${environment}' database...`);

  try{
    await db.sequelize.authenticate();
    console.log(`Database connection established for '${environment}' database.`);

    await db.sequelize.sync({force: true});
    console.log('Tables have been reset.');

    const csvFilePath = path.join(__dirname,'input', 'T1-L-T.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    const items: any[] = parse (fileContent, {
      columns: true,
      delimiter: ',',
    });

    console.log(`Found ${items.length} items to seed.`);

    const supermercadosMap = new Map();
    for (const item of items) {
      if (!supermercadosMap.has(item.supermarket)) {
        const [supermercado] = await db.Supermercados.findOrCreate({
          where: { id: item.supermarket},
          default: { supermercados_name: `Supermercardo ${item.supermarket}`}
        });
        supermercadosMap.set(item.supermarket, supermercado);
        console.log(`Ensured Supermercado with ID ${item.supermarket} exists.`);
      }
    }

    for (const item of items) {
      const price = Number(item.price_bs);
      if (NaN(price)) {
        console.warn(`Skipping item with invalid price: ${item.product_name}`)
      }
    }

  }
}