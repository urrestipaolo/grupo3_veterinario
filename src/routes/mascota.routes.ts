import { Router } from "express";
import { getMascota, postMascota } from "../controllers/mascota.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validateMascota } from "../middlewares/mascota.validate";
import { crearMascotaSchema } from "../schemas/mascota.schema";

const router = Router();

router.get("/", verifyToken, authorize ("RECEPCIONISTA", "VETERINARIO"), getMascota);
router.post("/", 
    verifyToken, 
    validateMascota(crearMascotaSchema, "body"), 
    authorize ("RECEPCIONISTA", "VETERINARIO"),
    postMascota);

export default router;
