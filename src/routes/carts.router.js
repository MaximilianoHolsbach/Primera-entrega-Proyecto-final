import { Router } from "express";

export const CartsRouter = Router();

CartsRouter.get('/api/carts', (req, res) => {
    res.send('GET to /carts')
});

