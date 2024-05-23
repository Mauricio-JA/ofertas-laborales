/*
  Warnings:

  - Added the required column `updatedAt` to the `OfertaLaboral` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OfertaLaboral" DROP CONSTRAINT "OfertaLaboral_administradorId_fkey";

-- AlterTable
ALTER TABLE "OfertaLaboral" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fechaPublicacion" DROP NOT NULL,
ALTER COLUMN "administradorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OfertaLaboral" ADD CONSTRAINT "OfertaLaboral_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "Administrador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
