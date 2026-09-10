import z from "zod";
import { Role } from "../../generated/prisma/enums";

export const registerSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre debe tener almenos 2 caracteres"),
  email: z.email("Formato de correo invalido").trim(),
  password: z.string().min(6, "la contraseña debe tener almenos 6 caracteres"),
  rol: z.enum(Role),
});

export const loginSchema = z.object({
  email: z.email("Formato de correo invalido").trim(),
  password: z.string().min(1, "la contraseña es requerida"),
});
export const updateSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener almenos 2 caracteres")
    .optional(),
  email: z.email("Formato de correo invalido").trim().optional(),
  password: z
    .string()
    .min(6, "la contraseña debe tener almenos 6 caracteres")
    .optional(),
  rol: z.enum(Role).optional(),
});