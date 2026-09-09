import { Router } from "express";
import { getUsuarios, postUsuario } from "../controllers/usuario.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "VETERINARIO"),
  getUsuarios,
);
router.post("/", postUsuario);

export default router;
