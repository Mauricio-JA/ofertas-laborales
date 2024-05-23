/*
  Warnings:

  - Added the required column `mostrarNombreEmpresa` to the `OfertaLaboral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OfertaLaboral" ADD COLUMN     "mostrarNombreEmpresa" BOOLEAN NOT NULL;
