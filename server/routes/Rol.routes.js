import { Router } from 'express';
import { getRoles, guardarRol,deleteRol,getPermisosByRolId,updateRol } from '../controller/Rol.js';
const router = Router();

router.get('/getRoles', getRoles);
router.post('/guardarRol', guardarRol);
router.delete('/DeleteRol/:id', deleteRol);
router.get('/getPermisosByRolId/:id', getPermisosByRolId);
router.put('/updateRol/:id', updateRol);

export default router;