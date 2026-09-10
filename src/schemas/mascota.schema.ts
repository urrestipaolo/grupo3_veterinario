import { z } from "zod";

export const crearMascotaSchema = z.object({
  nombre: z.string().trim().min(2, "Ingrese un nombre valido"),
  especie: z.enum(["PERRO", "GATO"]),
  raza: z.string().trim().min(4, "Ingrese una raza valida"),
  peso: z.string().trim().min(1, "Ingrese un peso valido"),
  edadAproximada: z.number().positive().min(1, "Ingrese una edad validad"),
  dueñoId: z.number().int().positive("Ingrese una ID valida"),
});