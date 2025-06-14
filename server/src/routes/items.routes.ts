import {Router, Request, Response} from 'express';
import * as itemsController from '../controllers/items'
import * as supermercadosController from '../controllers/supermercados';


const router:Router = Router();

router.get('/items',
  (req:Request, res:Response) =>
    itemsController.getItems(req, res)
);

router.post('/items',
  (req:Request, res:Response) =>
    itemsController.postItems(req, res)
);

router.get('/supermercados',
  (req:Request, res:Response) =>
    supermercadosController.getSupermercados(req, res));

router.post('/supermercados',
  (req:Request, res:Response) =>
    supermercadosController.postSupermercados(req, res));

router.post('/itemTags',
  (req:Request, res:Response) =>
    itemsController.itemTags(req, res));



export default router;