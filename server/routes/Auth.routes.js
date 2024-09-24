import { Router } from 'express'
import { register,login, logOut, verifyToken,actualizarPermisos} from '../controller/Auth.js'
import {authRequired} from '../middlewares/isAuthenticate.js'
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)
router.get('/verifyToken',verifyToken)
router.get('/actualizarPermisos/:Id',actualizarPermisos)



export default router;