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
    #swagger.description = 'Ingrese los datos del dueño en el cuerpo de la solicitud'
    #swagger.summary = 'Crea un nuevo dueño en el sistema'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  crearDueñoController
);

router.get(
  "/:id",
  authorize("RECEPCIONISTA", "VETERINARIO"),
  /* 
    #swagger.tags = ['Dueños']
    #swagger.description = 'Coloque el ID del dueño'
    #swagger.summary = 'Obtiene los detalles de un dueño específico por su ID, incluyendo sus mascotas'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  obtenerDueñoController
);

export default router;