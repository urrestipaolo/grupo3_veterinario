import { prisma } from "../config/prisma.js";

export async function getAllAtenciones() {
  return await prisma.atencionMedica.findMany({
    include: {
      mascota: true,
      veterinario: true,
      abiertaPor: true,
      examen: true,
    },
    orderBy: {
      fechaIngreso: "desc",
    },
  });
}

export async function getAtencionById(id: number) {
  return await prisma.atencionMedica.findUnique({
    where: {
      id,
    },
    include: {
      mascota: true,
      veterinario: true,
      abiertaPor: true,
      examen: true,
    },
  });
}

export async function createAtencion(data: {
  mascotaId: number;
  veterinarioId: number;
  abiertaPorId: number;
  motivoConsulta: string;
  diagnosticoPreliminar?: string;
  tratamiento?: string;
  estado?: "EN_CONSULTA" | "EN_ESPERA_EXAMENES" | "DADA_DE_ALTA";
}) {
return await prisma.atencionMedica.create({ data: 
    { mascotaId: data.mascotaId, 
    veterinarioId: data.veterinarioId, 
    abiertaPorId: data.abiertaPorId, 
    motivoConsulta: data.motivoConsulta, 
    ...(data.diagnosticoPreliminar !== undefined && { diagnosticoPreliminar: data.diagnosticoPreliminar, }), 
    ...(data.tratamiento !== undefined && { tratamiento: data.tratamiento, }), 
    ...(data.estado !== undefined && { estado: data.estado, }), }, });};

export async function updateAtencion(
  id: number,
  data: {
    mascotaId?: number;
    veterinarioId?: number;
    motivoConsulta?: string;
    diagnosticoPreliminar?: string;
    tratamiento?: string;
    estado?: "EN_CONSULTA" | "EN_ESPERA_EXAMENES" | "DADA_DE_ALTA";
  },
) {
  return await prisma.atencionMedica.update({
    where: {
      id,
    },
    data,
  });
}

export async function updateEstadoAtencion(
  id: number,
  estado: "EN_CONSULTA" | "EN_ESPERA_EXAMENES" | "DADA_DE_ALTA",
) {
  return await prisma.atencionMedica.update({
    where: {
      id,
    },
    data: {
      estado,
      fechaAlta: estado === "DADA_DE_ALTA" ? new Date() : null,
    },
  });
}

export async function deleteAtencion(id: number) {
  return await prisma.atencionMedica.delete({
    where: {
      id,
    },
  });
}