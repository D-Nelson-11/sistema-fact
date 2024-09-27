import { Router } from "express";
const router = Router();
import { generarFactura } from "../controller/Factura.js";

router.put('/generarFactura', generarFactura);

export default router;