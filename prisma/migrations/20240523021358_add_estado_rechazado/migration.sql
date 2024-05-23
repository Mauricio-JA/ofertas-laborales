-- AlterEnum
ALTER TYPE "EstadoOfertaLaboral" ADD VALUE 'RECHAZADA';

-- AlterTable
ALTER TABLE "OfertaLaboral" ADD COLUMN     "comentario" TEXT;
