import { Router } from "express";
const router = Router();
import {AddInventario,DeleteInventario,GetInventario,UpdateInventario,getInventarioById} from '../controller/Inventario.js'

router.post('/AddInventario', AddInventario);
router.delete('/DeleteInventario/:id', DeleteInventario);
router.get('/GetInventario', GetInventario);
router.put('/UpdateInventario/:id', UpdateInventario);
router.get('/getInventarioById/:id', getInventarioById);

export default router;