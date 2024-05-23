import { z } from "zod";
export const schemaCrearOfertaLaboral = z.object({
  titulo: z.string().min(1, "Titulo Requerido"),
  descripcion: z.string().min(1, "Descripcion Requerida"),
  ubicacion: z.string().min(1, "Ubicacion Requerida"),
  tipoEmpleo: z.enum(
    [
      "TIEMPO_COMPLETO",
      "TIEMPO_PARCIAL",
      "TIEMPO_LIBRE",
      "TEMPORAL",
      "CONSULTORIA",
      "PASANTIA",
    ],
    {
      message: "Seleccione una opción válida",
      required_error: "Tipo de Empleo Requerido",
    },
  ),
  areasDeInteres: z.number(),
  vacantes: z.number().min(1),
  checkMostrarNombreEmpresa: z.boolean().optional(),
});
