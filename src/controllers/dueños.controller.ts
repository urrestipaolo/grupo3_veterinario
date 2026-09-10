import type { Request, Response } from "express";
import { crearDueño, obtenerDueñoPorId } from "../models/dueños.model";

export async function crearDueñoController(req: Request, res: Response) {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Dueños"]
    #swagger.summary = "Crea un nuevo dueño en el sistema"
    #swagger.description = "Ingrese los datos del dueño en el cuerpo de la solicitud"
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nombre: { type: "string", example: "Maria Gomez" },
              telefono: { type: "string", example: "3411234567" },
              email: { type: "string", example: "maria@gmail.com" },
              direccion: { type: "string", example: "Av Siempreviva 742" }
            },
            required: ["nombre", "telefono"]
          }
        }
      }
    }
  */
  try {
    const dueño = await crearDueño(req.body);
    return res.status(201).json(dueño);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear el dueño" });
  }
}

export async function obtenerDueñoController(req: Request, res: Response) {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Dueños"]
    #swagger.summary = "Obtiene los detalles de un dueño específico por su ID, incluyendo sus mascotas"
    #swagger.description = "Coloque el ID del dueño"
  */
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "id inválido" });
  }

  try {
    const dueño = await obtenerDueñoPorId(id);

    if (!dueño) {
      return res.status(404).json({ error: "Dueño no encontrado" });
    }

    return res.json(dueño);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el dueño" });
  }
}