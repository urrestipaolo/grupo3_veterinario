import swaggerAutogen from "swagger-autogen";
import {
  EstadoExamen,
  type EstadoAtencion,
  type TipoExamen,
} from "../../generated/prisma/enums";

const doc = {
  info: {
    title: "API - Veterinaria",
    description: "Documentacion del sistema de Veterinaria",
    version: "1.0.0",
  },
  host: "localhost:3000",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  definitions: {
    Rol: {
      "@enum": ["RECEPCIONISTA", "VETERINARIO", "LABORATORISTA"],
      example: "RECEPCIONISTA",
    },
    Especie: {
      "@enum": ["PERRO", "GATO"],
    },
    EstadoAtencion: {
      "@enum": ["EN_CONSULTA", "EN_ESPERA_EXAMENES", "DADA_DE_ALTA"],
    },
    TipoExamen: {
      "@enum": ["HEMOGRAMA", "RAYOS_X", "ECOGRAFICA"],
    },
    EstadoExamen: {
      "@enum": ["PENDIENTE", "CANCELADO", "COMPLETADO"],
    },
    loginDTO: {
      email: "veterinario@gmail.com",
      password: "123456789",
    },
    registerDTO: {
      nombre: "juan perez",
      email: "veterinario@gmail.com",
      password: "123456789",
      rol: "VETERNIARIO",
    },
  },
};

const outputFile = "./src/config/swagger-output.json";

const routes = ["./src/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
