-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RECEPCIONISTA', 'VETERINARIO', 'LABORATORISTA');

-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('PERRO', 'GATO');

-- CreateEnum
CREATE TYPE "EstadoAtencion" AS ENUM ('EN_CONSULTA', 'EN_ESPERA_EXAMENES', 'DADA_DE_ALTA');

-- CreateEnum
CREATE TYPE "TipoExamen" AS ENUM ('HEMOGRAMA', 'RAYOS_X', 'ECOGRAFICA');

-- CreateEnum
CREATE TYPE "EstadoExamen" AS ENUM ('PENDIENTE', 'CANCELADO', 'COMPLETADO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dueños" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "direccion" TEXT,

    CONSTRAINT "dueños_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mascotas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" "Especie" NOT NULL,
    "raza" TEXT,
    "peso" DECIMAL(5,2) NOT NULL,
    "edad_aproximada" INTEGER NOT NULL,
    "dueño_id" INTEGER NOT NULL,

    CONSTRAINT "mascotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "antenciones_medicas" (
    "id" SERIAL NOT NULL,
    "mascota_id" INTEGER NOT NULL,
    "veterinario_id" INTEGER NOT NULL,
    "abierta_por_id" INTEGER NOT NULL,
    "motivo_consulta" TEXT NOT NULL,
    "diagnostico_preliminar" TEXT,
    "tratamiento" TEXT,
    "estado" "EstadoAtencion" NOT NULL DEFAULT 'EN_CONSULTA',
    "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_alta" TIMESTAMP(3),

    CONSTRAINT "antenciones_medicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examenes_laboratorio" (
    "id" SERIAL NOT NULL,
    "atencion_id" INTEGER NOT NULL,
    "tipo_examen" "TipoExamen" NOT NULL,
    "solicitado_por_id" INTEGER NOT NULL,
    "laboratorista_id" INTEGER NOT NULL,
    "resultados" TEXT,
    "observaciones" TEXT,
    "estado" "EstadoExamen" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_Resultado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "examenes_laboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "mascotas" ADD CONSTRAINT "mascotas_dueño_id_fkey" FOREIGN KEY ("dueño_id") REFERENCES "dueños"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antenciones_medicas" ADD CONSTRAINT "antenciones_medicas_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antenciones_medicas" ADD CONSTRAINT "antenciones_medicas_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antenciones_medicas" ADD CONSTRAINT "antenciones_medicas_abierta_por_id_fkey" FOREIGN KEY ("abierta_por_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examenes_laboratorio" ADD CONSTRAINT "examenes_laboratorio_atencion_id_fkey" FOREIGN KEY ("atencion_id") REFERENCES "antenciones_medicas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examenes_laboratorio" ADD CONSTRAINT "examenes_laboratorio_solicitado_por_id_fkey" FOREIGN KEY ("solicitado_por_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examenes_laboratorio" ADD CONSTRAINT "examenes_laboratorio_laboratorista_id_fkey" FOREIGN KEY ("laboratorista_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
