//import express, {Request, Response} from 'express';
import { Context } from 'koa';
const db = require('../models')

interface PostSupermercados {
  supermercados_name: string;
  supermercados_id: number;
}



async function getSupermercados (ctx: Context): Promise<void> {
  try {
    const result = await db.Supermercados.findAll({});
    ctx.status = 200;
    ctx.body = result;
  } catch (err) {
    console.log('err', err);
    ctx.throw(500);
  }
}

async function postSupermercados (ctx: Context): Promise<void> {
  const { supermercados_name, supermercados_id } = ctx.request.body as PostSupermercados;

  try {
    const result = await db.Supermercados.create({ supermercados_name, supermercados_id });
    ctx.status = 201;
    ctx.body = result;
  } catch (err) {
    console.log('err', err);
    ctx.throw(500);
  }
}




export  {postSupermercados, getSupermercados};