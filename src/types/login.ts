import type { Empresa, Persona, TipoUsuario, User } from "@prisma/client";

export type UsuarioLogin = User & {
  empresa?: Empresa;
  persona?: Persona;
  tipoUsuario: TipoUsuario;
};
