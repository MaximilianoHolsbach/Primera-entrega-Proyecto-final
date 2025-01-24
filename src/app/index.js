import express from 'express';
import { CartsRouter, ProductsRouter } from '../routes/index.js';

const initApp = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/products',ProductsRouter);
    app.use('/api/carts',CartsRouter);
    return app;
}
export default initApp;