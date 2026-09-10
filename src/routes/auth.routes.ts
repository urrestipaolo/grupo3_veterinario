import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/atencion-medica.validate.js";
import { registerSchema } from "../schemas/usuario.schema.js";

const router = Router();

router.post(
  "/register",
  verifyToken,
  authorize("VETERINARIO"),
  validate(registerSchema),
  register,
);
router.post("/login", login);

export default router;