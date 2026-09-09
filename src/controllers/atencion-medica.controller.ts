import type { Request, Response } from "express";

import {
  getAllAtenciones,
  getAtencionById,
  createAtencion,
  updateAtencion,
  updateEstadoAtencion,
  deleteAtencion,
} from "../models/atencion-medica.model.js";

export async function getAtenciones(req: Request, res: Response) {
    /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Atención Medica"]
    #swagger.summary = "Permite ver toda la lista de Atención Medica"
    #swagger.description= "Ver toda la lista de Atención Medica"
  */
  try {
    const atenciones = await getAllAtenciones();

    return res.status(200).json({
      message: "Atenciones médicas obtenidas correctamente",
      data: atenciones,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener las atenciones médicas",
    });
  }
}

export async function getAtencion(req: Request, res: Response) {
    /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Atención Medica"]
    #swagger.summary = "Buscar una Atención Medica por el ID"
    #swagger.description= "Ingrese la ID para encontrar la atención medica"
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const atencion = await getAtencionById(id);

    if (!atencion) {
      return res.status(404).json({
        message: "Atención médica no encontrada",
      });
    }

    return res.status(200).json({
      message: "Atención médica obtenida correctamente",
      data: atencion,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener la atención médica",
    });
  }
}

export async function createNuevaAtencion(req: Request, res: Response) {
    /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Atención Medica"]
    #swagger.summary = "Crear una Nueva Atención Medica"
    #swagger.description= "Siga el ejemplo para crear una nueva Atención Medica"
  */
  try {
    const atencion = await createAtencion(req.body);

    return res.status(201).json({
      message: "Atención médica creada correctamente",
      data: atencion,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear la atención médica",
    });
  }
}

export async function updateUnaAtencion(req: Request, res: Response) {
        /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Atención Medica"]
    #swagger.summary = "Actualizar una Atención Medica por el ID"
    #swagger.description= "Puede cambiar cualquier dato de la Atención Medica"
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const atencionExiste = await getAtencionById(id);

    if (!atencionExiste) {
      return res.status(404).json({
        message: "Atención médica no encontrada",
      });
    }

    const atencion = await updateAtencion(id, req.body);

    return res.status(200).json({
      message: "Atención médica actualizada correctamente",
      data: atencion,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al actualizar la atención médica",
    });
  }
}

export async function cambiarEstadoAtencion(req: Request, res: Response) {
        /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Atención Medica"]
    #swagger.summary = "Cambiar el estado de la Atención Medica"
    #swagger.description= "Ingrese el cambio para la Atención Medica"
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const atencionExiste = await getAtencionById(id);

    if (!atencionExiste) {
      return res.status(404).json({
        message: "Atención médica no encontrada",
      });
    }

    const atencion = await updateEstadoAtencion(id, req.body.estado);

    return res.status(200).json({
      message: "Estado actualizado correctamente",
      data: atencion,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al actualizar el estado",
    });
  }
}

export async function deleteUnaAtencion(req: Request, res: Response) {
    /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Atención Medica"]
    #swagger.summary = "ELIMINAR una Atención Medica por el ID"
    #swagger.description= "Ingrese la ID de la Atención Medica a eliminar"
  */
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const atencionExiste = await getAtencionById(id);

    if (!atencionExiste) {
      return res.status(404).json({
        message: "Atención médica no encontrada",
      });
    }

    await deleteAtencion(id);

    return res.status(200).json({
      message: "Atención médica eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al eliminar la atención médica",
    });
  }
}