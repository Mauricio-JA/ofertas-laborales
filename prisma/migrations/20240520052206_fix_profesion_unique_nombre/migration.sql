/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Profesion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profesion_nombre_key" ON "Profesion"("nombre");
