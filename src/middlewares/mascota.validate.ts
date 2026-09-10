import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export function validateMascota(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        message: "DATOS INCORRECTOS",
        errors: resultado.error.issues,
      });
    }

    req.body = resultado.data;

    next();
  };
}