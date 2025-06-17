import express, {Request, Response} from 'express';
const db = require('../models')

interface PostSupermercados {
  supermercados_name: string;
  supermercados_id: number;
}



async function getSupermercados (req:Request, res:Response): Promise<void> {
  try {
    const result = await db.Supermercados.findAll({});
    res.status(200).json(result);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500);
  }
}

async function postSupermercados (req:Request<{}, {}, PostSupermercados>, res:Response): Promise<void> {
  const { supermercados_name, supermercados_id } = req.body;

  try {
    const result = await db.Supermercados.create({ supermercados_name, supermercados_id });
    res.status(201).json(result);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500)
  }
}




export  {postSupermercados, getSupermercados};