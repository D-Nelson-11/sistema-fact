import { Router } from "express";
import {AddParametro,DeleteParametro,GetParametros,UpdateParametro} from '../controller/Parametros.js'

const router = Router();

router.post('/AddParametro', AddParametro);
router.delete('/DeleteParametro/:id', DeleteParametro);
router.get('/GetParametros', GetParametros);
router.put('/UpdateParametro/:id', UpdateParametro);

export default router;
