import { z } from "zod";

export const createAtencionSchema = z.object({
  mascotaId: z.coerce
    .number()
    .int()
    .positive("El mascotaId debe ser un número positivo"),

  veterinarioId: z.coerce
    .number()
    .int()
    .positive("El veterinarioId debe ser un número positivo"),

  abiertaPorId: z.coerce
    .number()
    .int()
    .positive("El abiertaPorId debe ser un número positivo"),

  motivoConsulta: z.string().min(1, "El motivo de consulta es obligatorio"),

  diagnosticoPreliminar: z.string().optional(),

  tratamiento: z.string().optional(),

  estado: z
    .enum(["EN_CONSULTA", "EN_ESPERA_EXAMENES", "DADA_DE_ALTA"])
    .optional(),
});

export const updateAtencionSchema = z.object({
  mascotaId: z.coerce.number().int().positive().optional(),

  veterinarioId: z.coerce.number().int().positive().optional(),

  motivoConsulta: z
    .string()
    .min(1, "El motivo de consulta no puede estar vacío")
    .optional(),

  diagnosticoPreliminar: z.string().optional(),

  tratamiento: z.string().optional(),

  estado: z
    .enum(["EN_CONSULTA", "EN_ESPERA_EXAMENES", "DADA_DE_ALTA"])
    .optional(),
});

export const estadoAtencionSchema = z.object({
  estado: z.enum(["EN_CONSULTA", "EN_ESPERA_EXAMENES", "DADA_DE_ALTA"]),
});
