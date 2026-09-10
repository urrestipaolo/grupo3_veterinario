import { Router } from "express";
import {
  deleteUsuario,
  getUsuarios,
  putUsuario,
} from "../controllers/usuario.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/atencion-medica.validate";
import { updateSchema } from "../schemas/usuario.schema";
const router = Router();

router.get(
  "/",
  verifyToken,
  authorize("RECEPCIONISTA", "VETERINARIO"),
  getUsuarios,
);
router.put(
  "/:id",
  verifyToken,
  authorize("VETERINARIO"),
  validate(updateSchema),
  putUsuario,
);
router.delete("/:id", verifyToken, authorize("VETERINARIO"), deleteUsuario);

export default router;
