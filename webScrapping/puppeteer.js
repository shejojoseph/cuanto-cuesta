// VIC: THIS (and all this webScrapping folder) IS MADE WITH AI HELP. 
// DONT NEED TO CHECK IT



const puppeteer = require('puppeteer');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('cuanto-cuesta', 'postgres', 'Admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false 
});

const Item = sequelize.define('Item', {
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  SupermercadoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {});


async function scrapeAndSave() {
  let browser;
  try {
  
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();


    console.log('Launching browser...');
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const initialUrl = 'https://vallearriba.elplazas.com/licores.html';
    console.log(`Navigating to initial page: ${initialUrl}...`);
    await page.goto(initialUrl, { waitUntil: 'networkidle2' });

    let allProducts = [];
    const nextButtonSelector = 'li.pages-item-next a[title="Siguiente"]';

    while (true) {
        console.log(`Scraping products from: ${page.url()}`);
        await autoScroll(page);
        const productsOnPage = await page.evaluate(() => {
            const productNodes = document.querySelectorAll('li.product-item');
            const data = [];
            productNodes.forEach(node => {
                const name = node.querySelector('a.product-item-link')?.innerText.trim();
                let priceText = node.querySelector('span.price')?.innerText.trim();
                const imageUrl = node.querySelector('img.product-image-photo')?.getAttribute('src');
                
                if (priceText) {
                    priceText = priceText.replace(/Bs\.\s?|,/g, '');
                }
                const price = parseFloat(priceText);

                if (name && !isNaN(price)) {
                    data.push({ name, price, imageUrl });
                }
            });
            return data;
        });
        allProducts = allProducts.concat(productsOnPage);
        console.log(`Found ${productsOnPage.length} products. Total: ${allProducts.length}`);
        
        const nextButton = await page.$(nextButtonSelector);
        if (nextButton) {
            console.log('Navigating to next page...');
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
                page.click(nextButtonSelector),
            ]);
        } else {
            console.log('Last page reached.');
            break;
        }
    }
    await browser.close();

    console.log('Scraping finished. Starting database insertion...');
    let createdCount = 0;
    let skippedCount = 0;

    for (const product of allProducts) {
      const [item, created] = await Item.findOrCreate({
        where: { 
          item_name: product.name,
          SupermercadoId: 1 
        },
        defaults: {
          price: product.price,
          imageUrl: product.imageUrl
        }
      });

      if (created) {
        createdCount++;
        console.log(`CREATED: ${item.item_name}`);
      } else {
        skippedCount++;
        // Opcional: Actualizar el precio si el producto ya existe
        item.price = product.price;
        await item.save();
        console.log(`UPDATED: ${item.item_name}`);
      }
    }
    
    console.log('----------------------------------------');
    console.log('Database insertion complete!');
    console.log(`- ${createdCount} new products were created.`);
    console.log(`- ${skippedCount} products were skipped (already existed).`);

  } catch (error) {
    console.error('An error occurred during the process:', error);
  } finally {
    if (sequelize) {
      await sequelize.close();
      console.log('Database connection closed.');
    }
    if (browser) {
        await browser.close();
    }
  }
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 200;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

scrapeAndSave();