import { prisma } from "../config/prisma";
import { Role } from "../../generated/prisma/enums";
import type { email } from "zod";

export interface RegistrarUsuario {
  nombre: string;
  email: string;
  password: string;
  rol: Role;
}

export const UsuarioModel = {
  getAll: async () => {
    return await prisma.usuario.findMany({ omit: { password: true } });
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
  update: async (
    id: number,
    data: { nombre?: string; email?: string; password?: string; rol?: Role },
  ) => {
    return await prisma.usuario.update({
      where: { id },
      data,
      omit: { contraseña: true, id: true },
    });
  },
  delete: async (id: number) => {
    return await prisma.usuario.delete({
      where: { id },
    });
  },
};
