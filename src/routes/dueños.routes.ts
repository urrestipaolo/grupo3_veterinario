import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/dueños.validate";
import { createDueñoSchema } from "../schemas/dueños.schema";
import { crearDueñoController, obtenerDueñoController } from "../controllers/dueños.controller";

const router = Router();

router.use(verifyToken);

router.post("/", authorize("RECEPCIONISTA"), validate(createDueñoSchema), crearDueñoController);
router.get("/:id", authorize("RECEPCIONISTA", "VETERINARIO"), obtenerDueñoController);

export default router;