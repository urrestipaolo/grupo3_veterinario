import express from "express";
import UsuarioRouter from "./routes/usuario.route";

const app = express();
app.use(express.json());

console.log("HOLA MUNDO");
app.use("/usuarios", UsuarioRouter);

app.listen(3000, () => {
  console.log(`servidor corriendo en http://localhost:3000`);
});
