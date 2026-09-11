import { prisma } from "../config/prisma.js";

//obtenemos todos los exámenes de laboratorio
export async function getAllExamenes(){
    return await prisma.examenLaboratorio.findMany({
        include: {
            atencion: true, //traemos los datos de la atención relacionada
            solicitadoPor: true, 
            laboratorista: true, //traemos quien es el laboratorista asignado
        },

        //mostramos primero los exámenes más recientes
        orderBy: {
            fechaResultado: "desc"
        },
    });
}


//obtenemos un examen de laboratorio por su id
export async function getExamenById(id:number) {
    return await prisma.examenLaboratorio.findUnique({
        where: {
            id, //buscamos el examen con ese id
        },

        include:{
            atencion: true,
            solicitadoPor: true,
            laboratorista: true,
        },
    });
}


//creamos una nueva orden de examen de laboratorio
export async function createExamen(data: {
    atencionId: number;
    tipoExamen: "HEMOGRAMA" |"RAYOS_X" | "ECOGRAFICA";
    solicitadoPorId: number;
    LaboratoristaId: number;
    resultados?: string;
    observaciones?: string;
}) {
    return await prisma.examenLaboratorio.create({
        data: {
            atencionId: data.atencionId, //relacionamos examen con una atención médica
            tipoExamen: data.tipoExamen, //indicamos tipo de examen que se solicita
            solicitadoPorId: data.solicitadoPorId,
            LaboratoristaId: data.LaboratoristaId, //laboratorista asignado
            //datos opcionales:
            ...(data.resultados !== undefined &&{
                resultados: data.resultados,
            }),

            ...(data.observaciones !== undefined && {
                observaciones: data.observaciones,
            }),
        },
    });
}


//actualizamos los datos de un examen de laboratorio
export async function updateExamen(
    id: number,
    data: {
        atencionId?: number;
    tipoExamen?: "HEMOGRAMA" |"RAYOS_X" | "ECOGRAFICA";
    solicitadoPorId?: number;
    LaboratoristaId?: number;
    resultados?: string;
    observaciones?: string;
    estado?: "PENDIENTE" | "CANCELADO" | "COMPLETADO";
    },
) {
    return await prisma.examenLaboratorio.update({
        where: {
            id, //buscamos examen con ese id
        },

        data, //enviamos los nuevos datos a Prisma
    });
}


//cambiamos solo el estado de un examen de laboratorio
export async function updateEstadoExamen(
    id: number,
    estado: "PENDIENTE" | "CANCELADO" | "COMPLETADO"
) {
    return await prisma.examenLaboratorio.update({
        where: {
            id,
        },

        data: {
            estado, //solo cambiamos su estado
        },
    });
}


//eliminamos un examen de laboratorio
export async function deleteExamen(id: number) {
    return await prisma.examenLaboratorio.delete({
        where: {
            id, //buscamos el examen que queremos eliminar
        },
    });
}