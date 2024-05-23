import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profesionRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.profesion.findMany({
        where: {
          nombre: {
            contains: input.search,
          },
        },
      });
    }),
});
