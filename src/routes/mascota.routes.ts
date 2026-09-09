import { Router } from "express";
import { getMascota, postMascota } from "../controllers/mascota.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get("/", verifyToken, authorize ("RECEPCIONISTA", "VETERINARIO"), getMascota);
router.post("/", verifyToken, authorize ("RECEPCIONISTA", "VETERINARIO"), postMascota);

export default router;
