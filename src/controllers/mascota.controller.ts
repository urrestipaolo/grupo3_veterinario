import type { Request, Response } from "express";
import { MascotaModel } from "../models/mascota.model";
import { Role } from "../../generated/prisma/enums";

export const getMascota = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ["Mascotas"]
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["MASCOTAS"]
    #swagger.summary = "Poder ver a todas las mascotas"
    #swagger.description= "Una lista con las mascotas de la Veterinaria"
  */
  try {
    const mascotax = await MascotaModel.getAll();
    return res.status(200).json({ data: mascotax });
  } catch (error) {
    console.log(error);
  }
};

export const postMascota = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ["Mascotas"]
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["MASCOTAS"]
    #swagger.summary = "Poder crear una mascota"
    #swagger.description= "Cree una mascota según el ejemplo"
  */
  try {
    const { nombre, especie, raza, peso, edadAproximada, dueñoId} = req.body;
    if (!nombre || !especie || !raza || !peso || !edadAproximada || !dueñoId) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const mascotax = await MascotaModel.crear({
      nombre,
      especie,
      raza,
      peso,
      edadAproximada,
      dueñoId,
    });
    return res
      .status(201)
      .json({ message: "La Mascota ha sido creada con exito", data: mascotax });
  } catch (error) {
    return res.status(500).json({ message: "error en el servidor" });
  }
};