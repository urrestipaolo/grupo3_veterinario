import { prisma } from "../config/prisma";
import { Especie, Role } from "../../generated/prisma/enums";

export interface RegistrarMascota {
  nombre: string;
  especie: Especie;
  raza: string;
  peso: string;
  edadAproximada: number;
  dueñoId: number;
}

export const MascotaModel = {
  getAll: async () => {
    return await prisma.mascota.findMany();
  },
  crear: async (data: RegistrarMascota) => {
    return await prisma.mascota.create({
      data,
    });
  },
};