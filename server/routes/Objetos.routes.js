import { Router } from 'express';
import { getObjetos } from '../controller/Objetos.js';
const router = Router();

router.get('/getObjetos', getObjetos);

export default router;