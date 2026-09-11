import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

//middleware para validar los datos recibidos
export function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = schema.safeParse(req.body);

        //error 400, si los datos no cumplen con el schema
        if(!resultado.success) {
            return res.status(400).json({
                message:"Datos inválidos",
                errors: resultado.error.issues,
            });
        }

        //reemplazo el body por los datos validados
        req.body = resultado.data;

        next();
    };
    }