//import {Router, Request, Response} from 'express';
import Router from '@koa/router';
import * as itemsController from '../controllers/items'
import * as supermercadosController from '../controllers/supermercados';


const router:Router =new Router();

router.get('/items', itemsController.getItems);

router.post('/items', itemsController.postItems);

router.get('/supermercados', supermercadosController.getSupermercados);

router.post('/supermercados', supermercadosController.postSupermercados);


router.post('/itemTags', itemsController.itemTags);



export default router;