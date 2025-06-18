//import express, {Request, Response} from 'express';
import { Context } from 'koa';
const db = require('../models');
const { Op } = require('sequelize');

interface RequestBody {
  SupermercadoId: number;
  item_name: string;
  item_id: number;
  price: number;
}

interface Tag {
  id: string;
}

async function getItems (ctx: Context): Promise<void> {
  try {
    const result = await db.Items.findAll({
  order: [
    ['price', 'ASC']
  ]
});

    ctx.body = result;
    ctx.status = 200;
  } catch (err) {
    console.error('err', err);
    ctx.throw(500);
  }
}

async function postItems (ctx: Context): Promise<void> {
  const { SupermercadoId, item_name, item_id, price } = ctx.request.body as RequestBody;

  try {
    const result = await db.Items.create({ SupermercadoId, item_name, item_id, price });
    ctx.body = result;
    ctx.status = 201;
  } catch (err) {
    console.error('err', err);
    ctx.throw(500);
  }
}


/*
SELECT * FROM Items
WHERE name LIKE "%TOMATE%" AND name LIKE "%500%"
*/
export async function itemTags(ctx: Context): Promise<void> {
  const tags = ((ctx.request.body as Tag[]) || []).map(tag => ({
    item_name_toLowerCase: { [Op.like]: `%${tag.id.toLowerCase()}%` },
  }));

  if (tags.length === 0) {
    ctx.body = [];
    ctx.status = 200;
    return;
  }

  try {
    const result = await db.Items.findAll({
      where: { [Op.and]: tags },
      order: [['price', 'ASC']],
    });
    ctx.body = result;
    ctx.status = 200;
  } catch (err) {
    console.error('err', err);
    ctx.throw(500);
  }
}


export { postItems, getItems };