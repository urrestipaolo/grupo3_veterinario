import { prisma } from "../config/prisma";
import type { Dueño, Prisma } from "../../generated/prisma/client";
 
export function crearDueño(data: Prisma.DueñoCreateInput): Promise<Dueño> {
  return prisma.dueño.create({ data });
}
 
// Busca un dueño por id, incluyendo todas y cada una de sus mascotas =D . Devuelve null si no existe.
export function obtenerDueñoPorId(id: number) {
  return prisma.dueño.findUnique({
    where: { id },
    include: { mascotas: true },
  });
}