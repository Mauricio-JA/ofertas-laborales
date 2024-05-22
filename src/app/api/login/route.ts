import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

type TBody = {
  username: string;
  password: string;
};

export async function POST(req: Request) {
  const body: TBody = (await req.json()) as TBody;

  //validar que el body tenga los campos necesarios
  if (!body.username || !body.password) {
    return Response.json(
      { message: "Faltan campos obligatorios" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const prisma = new PrismaClient();

  const usuario = await prisma.user.findFirst({
    where: { nombreUsuario: body.username },
    include: {
      tipoUsuario: true,
      empresa: true,
      persona: true,
    },
  });

  if (!usuario) {
    return Response.json(
      { ok: false, message: "Nombre de Usuario no encontrado" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const isValid = bcrypt.compareSync(body.password, usuario.contrasena);

  if (!isValid) {
    return Response.json(
      { ok: false, message: "Contrasena incorrecta" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  return Response.json({ ok: true, data: usuario });
}
