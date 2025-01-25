import {log} from 'console';
import express from 'express';
import productsRouter from './routes/products.router.js';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);

app.listen(port, () => {log(`Servidor escuchando en http://localhost:${port}`)});