import { z } from "zod";

//validación para crear una orden de examen
export const createExamenLaboratorioSchema = z.object({ //cuando se crea una orden
    atencionId: z.coerce
    .number()
    .int()
    .positive("SE debe ingresar un número positivo"),

    tipoExamen: z.enum(["HEMOGRAMA", "RAYOS_X", "ECOGRAFICA"]),
    
    solicitadoPorId: z.coerce
    .number()
    .int()
    .positive("SE debe ingresar un número positivo"),

    LaboratoristaId: z.coerce
    .number()
    .int()
    .positive("SE debe ingresar un número positivo"),

    resultados: z.string().optional(),

    observaciones: z.string().optional(),
});


//validación para actualizar un examen
export const updateExamenLaboratorioSchema = z.object({ //cuando modificamos un examen
    atencionId: z.coerce.number().int().positive().optional(),

    tipoExamen: z
    .enum(["HEMOGRAMA", "RAYOS_X", "ECOGRAFICA"])
    .optional(),

    solicitadoPorId: z.coerce.number().int().positive().optional(),

    LaboratoristaId: z.coerce.number()
    .int()
    .positive()
    .optional(),

    resultados: z.string().optional(),

    observaciones: z.string().optional(),

    estado: z
    .enum(["PENDIENTE", "CANCELADO", "COMPLETADO"])
    .optional(),
});

//validación para cambiar el estado
export const estadoExamenSchema = z.object({ //cuando solo cambiamos su estado
    estado: z.enum(["PENDIENTE", "CANCELADO", "COMPLETADO"])
});