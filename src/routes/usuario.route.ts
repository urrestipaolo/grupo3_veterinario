import { Router } from "express";
import { getUsuarios } from "../controllers/usuario.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "VETERINARIO"),
  getUsuarios,
);

export default router;
