import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
import data from "./defaultData.json" assert { type: "json" };

async function main() {
  const { tiposUsuario, administrador, empresas, estudiantes } = data;

  const salt = bcrypt.genSaltSync(5);
  const hashAdmin = bcrypt.hashSync("admin123", salt);
  const hashEmpresas = bcrypt.hashSync("empresa123", salt);
  const hashUsuarios = bcrypt.hashSync("estudiante", salt);

  for (const tipo of tiposUsuario) {
    await prisma.tipoUsuario.create({
      data: tipo,
    });
  }

  await prisma.persona.create({
    data: {
      nombre: administrador.nombre,
      apellidoPaterno: administrador.apellidoPaterno,
      apellidoMaterno: administrador.apellidoMaterno,
      correo: administrador.correo,
      administrador: {
        create: {},
      },
      usuario: {
        create: {
          email: administrador.correo,
          nombreUsuario: administrador.usuario.nombreUsuario,
          contrasena: hashAdmin,
          estado: administrador.usuario.estado,
          tipoUsuario: {
            connect: {
              id: 1,
            },
          },
        },
      },
    },
  });

  for (const empresa of empresas) {
    await prisma.empresa.create({
      data: {
        nombre: empresa.nombre,
        correo: empresa.correo,
        direccion: empresa.direccion,
        telefono: empresa.telefono,
        usuario: {
          create: {
            email: empresa.correo,
            nombreUsuario: empresa.usuario.nombreUsuario,
            contrasena: hashEmpresas,
            estado: empresa.usuario.estado,
            tipoUsuario: {
              connect: {
                id: 2,
              },
            },
          },
        },
      },
    });
  }

  for (const estudiante of estudiantes) {
    await prisma.persona.create({
      data: {
        nombre: estudiante.nombre,
        apellidoPaterno: estudiante.apellidoPaterno,
        apellidoMaterno: estudiante.apellidoMaterno,
        correo: estudiante.correo,
        estudiante: {
          create: {
            profesion: {
              connectOrCreate: {
                where: {
                  nombre: estudiante.estudiante.profesion,
                },
                create: {
                  nombre: estudiante.estudiante.profesion,
                },
              },
            },
          },
        },
        usuario: {
          create: {
            email: estudiante.correo,
            nombreUsuario: estudiante.usuario.nombreUsuario,
            contrasena: hashUsuarios,
            estado: estudiante.usuario.estado,
            tipoUsuario: {
              connect: {
                id: 3,
              },
            },
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
