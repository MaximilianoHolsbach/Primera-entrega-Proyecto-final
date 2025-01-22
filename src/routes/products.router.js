import { Router } from "express";

export const ProductsRouter = Router();

ProductsRouter.get('/api/products', (req, res) => {
    res.send('GET to /products')
});

