import { Router } from "express";
import CartsManager from '../controllers/cartsControllers.js'


const router = Router();

router.post('/', CartsManager.createCart);
router.get('/:id', CartsManager.getCart);
router.post('/:cid/product/:pid', CartsManager.addProductToCart);

export default router;