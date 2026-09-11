import { Router } from "express";
//importamos las funciones del controller
import { getExamenes, getExamen, createNuevoExamen, updateUnExamen, cambiarEstadoExamen, deleteUnExamen } from "../controllers/examen-laboratorio.controller.js";
//importamos el middleware de validación
import  { validate } from "../middlewares/examen-laboratorio.validate.js";
//importamos los chemas del zod
import { createExamenLaboratorioSchema, updateExamenLaboratorioSchema, estadoExamenSchema } from "../schemas/examen-laboratorio.schema.js";

const router = Router(); //creamos el router

router.get("/", getExamenes); //ruta para obtener todos los exámenes
router.get("/:id", getExamen); //ruta obtener examen por id
router.post("/", 
    validate(createExamenLaboratorioSchema), //validamos los datos recibidos
    createNuevoExamen, //creamos el exámen
); 
router.put("/:id",
    validate(updateExamenLaboratorioSchema), //validamos los datos a actualizar
    updateUnExamen, //actualizamos el exámen
);
router.patch("/:id/estado",
    validate(estadoExamenSchema), //validamos el nuevo estado
    cambiarEstadoExamen, //cambiamos solamente el estado
);
router.delete("/:id",
    deleteUnExamen, //eliminamos el examen indicado por su id
);  

export default router;