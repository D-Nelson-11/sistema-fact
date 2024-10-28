import { Router } from 'express';
import {getUsuarios, guardarUsuario, deleteUsuario,updateUsuario, insertBitacora,getBitacora} from '../controller/Usuario.js';
const router = Router();

router.get('/getUsuarios', getUsuarios);
router.post('/guardarUsuario', guardarUsuario);
router.delete('/deleteUsuario/:id', deleteUsuario); 
router.put('/updateUsuario/:id', updateUsuario);
router.post('/insertBitacora', insertBitacora);
router.get('/getBitacora', getBitacora);

export default router;