import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { crearDueñoController, obtenerDueñoController } from "../controllers/dueños.controllers";

const router = Router();

router.use(verifyToken);

router.post("/", authorize("RECEPCIONISTA"), crearDueñoController);
router.get("/:id", obtenerDueñoController);

export default router;