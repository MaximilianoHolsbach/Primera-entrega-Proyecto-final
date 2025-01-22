import express from 'express';
import {log} from 'console';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.listen(port, () => {log(`Server iniciado en puerto ${port}`)})