import { z } from "zod";

export const createDueñoSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  telefono: z.string().min(6, "El telefono es obligatorio"),
  email: z.string().email("El email no es válido").optional(),
  direccion: z.string().optional(),
});