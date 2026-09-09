import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: resultado.error.issues,
      });
    }

    req.body = resultado.data;

    next();
  };
}
