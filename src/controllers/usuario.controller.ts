import type { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario.model";

export const getUsuarios = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Usuarios"]
    #swagger.summary = "ver a todos los usuarios"
    #swagger.description= "Permite visualizar el listado de todos los usuarios"
  */
  try {
    const Usuarios = await UsuarioModel.getAll();
    return res.status(200).json({ data: Usuarios });
  } catch (error) {
    console.log(error);
  }
};

/* export const postUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const usuario = await UsuarioModel.crear({ nombre, email, password, rol });
    return res
      .status(201)
      .json({ message: "usuario creado con exito", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}; */
