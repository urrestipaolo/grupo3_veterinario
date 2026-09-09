import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { crearDueñoController, obtenerDueñoController } from "../controllers/dueños.controller";

const router = Router();

router.use(verifyToken);

router.post(
  "/",
  authorize("RECEPCIONISTA"),
  /* 
    #swagger.tags = ['Dueños']
    #swagger.description = 'Registra un nuevo dueño (solo recepción)'
  */
  crearDueñoController
);

router.get(
  "/:id",
  /* 
    #swagger.tags = ['Dueños']
    #swagger.description = 'Devuelve un dueño con sus mascotas'
  */
  obtenerDueñoController
);

export default router;