import { prisma } from "../config/prisma";
import { Role } from "../../generated/prisma/enums";

export interface RegistrarUsuario {
  nombre: string;
  email: string;
  password: string;
  rol: Role;
}

export const UsuarioModel = {
  getAll: async () => {
    return await prisma.usuario.findMany();
  },
  crear: async (data: RegistrarUsuario) => {
    return await prisma.usuario.create({
      data,
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true,
      },
    });
  },
};
