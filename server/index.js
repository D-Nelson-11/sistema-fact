import express from 'express'
import cors from 'cors'
import Factura from './routes/Factura.routes.js'
import Inventario from './routes/Inventario.routes.js'
import Parametros from './routes/Parametros.routes.js'
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json());
app.use('/api', Factura)
app.use('/api', Inventario)
app.use('/api', Parametros)



app.listen(3000);