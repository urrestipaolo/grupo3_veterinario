console.log("HOLA MUNDO");
import express from "express";
import cors from "cors";
import atencionMedicaRouter from "./routes/atencion-medica.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/atenciones-medicas", atencionMedicaRouter);
