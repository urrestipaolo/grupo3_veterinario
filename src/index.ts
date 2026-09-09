import express from "express";
import UsuarioRouter from "./routes/usuario.route";
import authRouter from "./routes/auth.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger-output.json" with { type: "json" };
import DueñosRouter from "./routes/dueños.routes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de Veterniaria",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/usuarios", UsuarioRouter);
app.use("/dueños", DueñosRouter);

app.listen(3000, () => {
  console.log(`servidor corriendo en http://localhost:3000`);
});
