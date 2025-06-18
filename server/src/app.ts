//import express, {Express, Request, Response } from 'express';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import itemRoutes from './routes/items.routes';

const app = new Koa();

app.use(cors());
app.use(bodyParser());

// Routes

app.use(itemRoutes.routes());
app.use(itemRoutes.allowedMethods());

// Default route for basic testing

app.use(async ctx => {
  if (ctx.method === 'GET' && ctx.path === '/') {
    ctx.status = 200;
    ctx.body = 'Server is up!';
  }
});

export default app; // Export the app for testing
