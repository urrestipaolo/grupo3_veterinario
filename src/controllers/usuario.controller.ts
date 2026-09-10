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
export const putUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /*  #swagger.security = [{ "bearerAuth": [] }]
      #swagger.tags = ['Usuarios']
      #swagger.description = 'Actualiza el Rol de un Usuario'
      #swagger.summary = "Actualiza a un Usuario usuarios"
      #swagger.requestBody = {
        required: true,
        content: {
           "application/json": {
              schema: {
                 type: "object",
                 properties: {
                    nombre: { type: "string", example: "Juan" },
                    email: { type: "string", example: "juan@example.com" },
                    password: { type: "string", example: "123456789" },
                    rol: { type: "string", example: "RECEPCIONISTA" }
                 }
              }
           }
        }
     }*/
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "El ID debe ser un numero valido" });
      return;
    }
    const usuarioQueActualiza = req.user;
    const { nombre, email, password, rol } = req.body;
    const updateUser = await UsuarioModel.update(id, {
      nombre,
      email,
      password,
      rol,
    });
    res.status(200).json({
      message: "Usuario actualizado con exito",
      data: updateUser,
      actualizadoPor: {
        id: usuarioQueActualiza?.id,
        email: usuarioQueActualiza?.email,
        rol: usuarioQueActualiza?.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const deleteUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // #swagger.security = [{ "bearerAuth": [] }]
  // #swagger.tags = ['Usuarios']
  // #swagger.description = 'Elimina un usuario'
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "El ID debe ser un numero valido" });
      return;
    }
    const usuarioQueElimina = req.user;

    await UsuarioModel.delete(id);
    res.status(200).json({
      message: "Usuario eliminado exitosamente",
      idEliminado: id,
      eliminadoPor: {
        id: usuarioQueElimina?.id,
        email: usuarioQueElimina?.email,
        rol: usuarioQueElimina?.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};
