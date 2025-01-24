import initApp from './app/index.js';
import {log} from 'console';

const app = initApp();
const port = 8080;
app.listen(port, () => {log(`Servidor escuchando en http://localhost:${port}`)});