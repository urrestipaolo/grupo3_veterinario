import type { Request, Response } from "express";
import { crearDueño, obtenerDueñoPorId } from "../models/dueños.model";

// POST /dueños — recepción registra al dueño.
export async function crearDueñoController(req: Request, res: Response) {
  // #swagger.tags = ['Dueños']
  // #swagger.description = 'Registra un nuevo dueño (solo recepción)'
  const { nombre, telefono, email, direccion } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({ error: "nombre y telefono son obligatorios" });
  }

  const dueño = await crearDueño({ nombre, telefono, email, direccion });
  return res.status(201).json(dueño);
}

// GET /dueños/:id — devuelve el dueño con sus mascotas.
export async function obtenerDueñoController(req: Request, res: Response) {
  // #swagger.tags = ['Dueños']
  // #swagger.description = 'Devuelve un dueño con sus mascotas'
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "id inválido" });
  }

  const dueño = await obtenerDueñoPorId(id);

  if (!dueño) {
    return res.status(404).json({ error: "Dueño no encontrado" });
  }

  return res.json(dueño);
}