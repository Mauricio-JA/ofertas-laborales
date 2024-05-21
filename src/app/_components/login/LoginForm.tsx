"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

// type Props = {};

const LoginForm = () =>
  //    props: Props
  {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
      console.log(data);
    };

    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="w-full rounded-md border-2 p-4 shadow-sm md:w-3/5">
          <div className="mb-5 text-center">
            <Image
              src="https://primefaces.org/cdn/primereact/images/logo.png"
              alt="hyper"
              width={50}
              height={50}
              className="mx-auto mb-3"
            />
            <div className="text-900 mb-3 text-3xl font-medium">
              Bienvenido a <span className="text-slate-700">PortalLaboral</span>
            </div>
            {/* <span className="text-600 line-height-3 font-medium">
              ¿No tienes una cuenta?
            </span>
            <a className="ml-2 cursor-pointer font-medium text-blue-500 no-underline">
              ¡Regístrate ahora!
            </a> */}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="username"
              className="text-900 mb-2 block font-medium"
            >
              Nombre de usuario
            </label>
            <InputText
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              className="mb-3 w-full"
              {...register("username")}
            />

            <label
              htmlFor="password"
              className="text-900 mb-2 block font-medium"
            >
              Contraseña
            </label>
            <IconField className="mb-3">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full"
                {...register("password")}
              />
              <InputIcon
                className={`cursor-pointer text-xl ${
                  showPassword ? "pi pi-eye-slash" : "pi pi-eye"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </IconField>
            <Button
              label="Iniciar Sesión"
              className=" mb-3 mt-6 w-full"
              type="submit"
            />
            <div className="mb-2 text-center">
              <span className="text-600 line-height-3 font-medium">
                ¿Eres una empresa y no tienes una cuenta?
              </span>
            </div>
            <Button
              type="button"
              severity="secondary"
              label="Regístrate"
              className="w-full"
              onClick={() => {
                router.push("/registrate");
              }}
            />
          </form>
        </div>
      </div>
    );
  };

export default LoginForm;
