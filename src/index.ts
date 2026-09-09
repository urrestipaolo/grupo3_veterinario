import express from "express";
import cors from "cors";
import atencionMedicaRouter from "./routes/atencion-medica.routes.js";
import UsuarioRouter from "./routes/usuario.route";
import MascotaRouter from "./routes/mascota.routes"
import authRouter from "./routes/auth.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger-output.json" with { type: "json" };

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "API de Veterniaria",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/mascotas", MascotaRouter);
app.use("/api/atenciones-medicas", atencionMedicaRouter);

app.listen(3000, () => {
  console.log(`servidor corriendo en http://localhost:3000`);
});
