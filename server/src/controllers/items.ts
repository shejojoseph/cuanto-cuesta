import express, {Request, Response} from 'express';
import db from '../models';
import { Op } from 'sequelize';

interface RequestBody {
  SupermercadoId: number;
  item_name: string;
  item_id: number;
  price: number;
}

interface Tag {
  id: string;
}

async function getItems (req:Request, res:Response): Promise<void> {
  try {
    const result = await db.Items.findAll({
  order: [
    ['price', 'ASC']
  ]
});
    res.status(200).json(result);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500);
  }
}

async function postItems (req:Request<{}, {}, RequestBody>, res:Response): Promise<void> { // Request<{}, {}, RequestBody>: no route params, default response body, and RequestBody for req.body
  const { SupermercadoId, item_name, item_id, price } = req.body;

  try {
    const result = await db.Items.create({ SupermercadoId, item_name, item_id, price });
    res.status(201).json(result);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500)
  }
}


/*
SELECT * FROM Items
WHERE name LIKE "%TOMATE%" AND name LIKE "%500%"
*/
async function itemTags (req:Request<{}, {}, Tag[]>, res:Response): Promise<void> { // Request<{}, {}, Tag[]>: no route params, default response body, and Tag[] for req.body

  const tags = req.body.map(tag => {
    return {
    item_name_toLowerCase: { [Op.like]: `%${tag.id.toLowerCase()}%` }
    }
  });
  if (tags.length === 0) {
    res.json([]);
    return;
  }
  console.log('req.body',req.body);
  try {
    console.log(tags);
    const result = await db.Items.findAll({
      where: {
        [Op.and]: tags
      },
      order: [
        ['price', 'ASC']
      ]
});
console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500);
  }
}



export { postItems, getItems, itemTags };