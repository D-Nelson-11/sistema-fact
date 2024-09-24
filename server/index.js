import express from 'express'
import cors from 'cors'
import Factura from './routes/Factura.routes.js'
import Inventario from './routes/Inventario.routes.js'
import Parametros from './routes/Parametros.routes.js'
import Roles from './routes/Rol.routes.js'
import auth from './routes/Auth.routes.js'
import Objetos from './routes/Objetos.routes.js'
import Permisos from './routes/Permisos.routes.js'

import cookie from 'cookie-parser'
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(cookie());

app.use('/api', Factura);
app.use('/api', Inventario);
app.use('/api', Parametros);
app.use('/api', Roles);
app.use('/api', Objetos);
app.use('/api', Permisos);
app.use('/api', auth);




app.listen(3000);