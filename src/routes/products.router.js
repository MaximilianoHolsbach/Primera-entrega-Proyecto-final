import { Router } from "express";
import productsController from "../controllers/productsController.js";


const router = Router()

router.post('/', productsController.addProduct);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;