import { z } from "zod";
import { schemaCrearOfertaLaboral } from "~/helpers/schemas";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ofertaLaboralRouter = createTRPCRouter({
  getByIdEmpresa: protectedProcedure.query(async ({ ctx }) => {
    const idUsuario = ctx.session.user.id;
    return ctx.db.ofertaLaboral.findMany({
      where: {
        empresa: {
          usuarioId: idUsuario,
        },
      },
    });
  }),
  searchActiveByTitle: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.ofertaLaboral.findMany({
        where: {
          estado: "ACTIVA",
          titulo: {
            contains: input.title,
          },
        },
        include: {
          empresa: true,
          areasInteres: true,
        },
      });
    }),

  getByEstadoRevision: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.ofertaLaboral.findMany({
      where: {
        estado: "REVISION",
      },
      include: {
        empresa: true,
        areasInteres: true,
      },
    });
  }),
  create: protectedProcedure
    .input(schemaCrearOfertaLaboral)
    .mutation(async ({ ctx, input }) => {
      const idUsuario = ctx.session.user.id;
      return ctx.db.ofertaLaboral.create({
        data: {
          titulo: input.titulo,
          descripcion: input.descripcion,
          tipoTrabajo: input.tipoEmpleo,
          ubicacion: input.ubicacion,
          vacantes: input.vacantes,
          areasInteres: {
            connect: {
              id: input.areasDeInteres,
            },
          },
          mostrarNombreEmpresa: input.checkMostrarNombreEmpresa ?? false,
          estado: "REVISION",
          empresa: {
            connect: {
              usuarioId: idUsuario,
            },
          },
        },
      });
    }),

  reject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ofertaLaboral.update({
        where: {
          id: input.id,
        },
        data: {
          estado: "RECHAZADA",
        },
      });
    }),

  approve: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ofertaLaboral.update({
        where: {
          id: input.id,
        },
        data: {
          estado: "ACTIVA",
          fechaPublicacion: new Date(),
        },
      });
    }),
});
