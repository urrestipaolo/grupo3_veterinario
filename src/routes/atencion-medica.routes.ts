import { Router } from "express";

import {
  getAtenciones,
  getAtencion,
  createNuevaAtencion,
  updateUnaAtencion,
  cambiarEstadoAtencion,
  deleteUnaAtencion,
} from "../controllers/atencion-medica.controller.js";

import { validate } from "../middlewares/atencion-medica.validate.js";

import {
  createAtencionSchema,
  updateAtencionSchema,
  estadoAtencionSchema,
} from "../schemas/atencion-medica.schema.js";

const router = Router();

router.get("/", getAtenciones);

router.get("/:id", getAtencion);

router.post("/", validate(createAtencionSchema), createNuevaAtencion);

router.put("/:id", validate(updateAtencionSchema), updateUnaAtencion);

router.patch(
  "/:id/estado",
  validate(estadoAtencionSchema),
  cambiarEstadoAtencion,
);

router.delete("/:id", deleteUnaAtencion);

export default router;
