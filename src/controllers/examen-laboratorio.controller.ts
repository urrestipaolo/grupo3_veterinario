import type { Request, Response } from "express";
import { getAllExamenes, getExamenById, createExamen, updateExamen, updateEstadoExamen, deleteExamen } from "../models/examen-laboratorio.model.js";

//buscar un examen por id
export const getExamenes = async (req: Request, res: Response) => {
    /*
    #swagger.security = [{ "bearerAuth":[] }]
    #swagger.tags = ["Exámenes de laboratorio"]
    #swagger.summary = "Obtener todos los exámenes de laboratorio"
    #swagger.description = "Permite visualizar el listado de todos los exámenes"
    */

    try{
        const examenes = await getAllExamenes(); //pedimos al modelo todos los exámenes
        return res.status(200).json({ data: examenes}); //devolvemos el examen encontrado

    }catch (error){
        return res.status(500).json({ message: error}); //devolvemos 500, si hay un error
    }
};


export const getExamen = async (req: Request, res: Response) => {
    /*
    #swagger.security = [{ "bearerAuth":[] }]
    #swagger.tags = ["Exámenes de laboratorio"]
    #swagger.summary = "Obtener un examen de laboratorio por ID"
    #swagger.description = "Permite visualizar un examen específico"
    */

    try{
        const id = Number(req.params.id); //convertimos el id recibido en la url a número

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "El ID debe ser un número positivo",
            });
        }

        const examen= await getExamenById(id); //buscamos el examen mediante el modelo

        if (!examen) {
            return res.status(404).json({
                message: "Examen no encontrado", //404 si no existe
            });
        }

        return res.status(200).json({ data: examen }); //devolvemos el examen encontrado
        
    } catch (error){
        return res.status(500).json({ message:error }); //500 si ocurre un error
    }
};


//crear un examen
export const createNuevoExamen = async (req: Request, res: Response) => {
    /*
    #swagger.security = [{ "bearerAuth":[] }]
    #swagger.tags = ["Exámenes de laboratorio"]
    #swagger.summary = "Crear una orden de examen de laboratorio"
    #swagger.description = "Permite crear una nueva orden de examen"
    */

    try{
        const examen = await createExamen(req.body); //tomamos los datos que vienen en el body

        return res.status(201).json({
            message: "Examen creado con éxito",
            data: examen,
        });

    } catch(error) {

        return res.status(500).json({ message: error });
    }
};


//actualizar un exámen
export const updateUnExamen = async (req: Request, res: Response) => {
    /*
    #swagger.security = [{ "bearerAuth":[] }]
    #swagger.tags = ["Exámenes de laboratorio"]
    #swagger.summary = "Actualizar un examen de laboratorio"
    #swagger.description = "Permite modificar los datos de un examen"
    */

    try{
        const id = Number(req.params.id); 

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "El id debe ser un numero positivo",
            });
        }

        const examenExistente = await getExamenById(id); //comprobamos que el exámen exista

        if (!examenExistente){
            return res.status(404).json({
                message: "Examen no encontrado",
            });
        }

        const examen = await updateExamen(id, req.body); //actualizamos el examen con los datos recibidos

        return res.status(200).json({ //devolvemos el examen actualizado
            message: "Examen actualizado con éxito",
            data: examen,
        });

    }catch (error) {

        return res.status(500).json({ message: error }); //500 si ocurre un error
    }
};


//cambiar solo el estado de un exámen
export const cambiarEstadoExamen = async (req: Request, res: Response) => {
    /*
    #swagger.security = [{ "bearerAuth":[] }]
    #swagger.tags = ["Exámenes de laboratorio"]
    #swagger.summary = "Cambiar el estado de un exámen"
    #swagger.description = "Permite modificar solamente el estado de un examen"
    */

    try{
        const id= Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "El id debe ser un número positivo",
            });
        }

        const examenExistente =await getExamenById(id); //comprobamos que el exámen exista

        if (!examenExistente) {
            return res.status(404).json({
                message: "Examen no encontrado",
            });
        }

        const examen = await updateEstadoExamen(id, req.body.estado);//cambiamos solamente el estado

        return res.status(200).json({ //devolvemos un examen actualizado
            message: "Estado del exámen actualizado con éxito",
            data: examen,
        });
    
    }catch (error) {

        return res.status(500).json({ message: error }); //500 si ocurre un error
    }
};


//eliminar un examen
export const deleteUnExamen = async (req: Request, res: Response) => {
    /*
    #swagger.security = [{ "bearerAuth":[] }]
    #swagger.tags = ["Exámenes de laboratorio"]
    #swagger.summary = "Eliminar un exámen de laboratorio"
    #swagger.description = "Permite eliminar un examen"
    */

    try{
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "El id debe ser un número positivo",
            });
        }

        const examenExistente = await getExamenById(id); //comprobamos que exista el examen

        if (!examenExistente) {
            return res.status(404).json({
                message: "Examen no encontrado",
            });
        }

        await deleteExamen(id); //eliminamos el examen

        return res.status(200).json({
            message: "Examen eliminado con éxito",
        });

    }catch (error){
        
        return res.status(500).json({ message: error});
    }
};

































