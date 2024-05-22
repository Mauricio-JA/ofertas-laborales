"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type SubmitHandler,
  useForm,
  type SubmitErrorHandler,
} from "react-hook-form";
import { signIn } from "next-auth/react";

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
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
      console.log(data);
      await signIn("credentials", {
        username: data.username,
        password: data.password,
      });
    };

    const onError: SubmitErrorHandler<Inputs> = (errors) => {
      console.log(errors);
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
            <div className="mb-2 text-center">
              <div className="text-900 mb-3 text-lg font-medium text-red-600">
                {error}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label
              htmlFor="username"
              className="text-900 mb-2 mt-4 block font-medium"
            >
              Nombre de usuario
            </label>
            <InputText
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              className="w-full"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-600">Este campo es requerido</span>
            )}
            <label
              htmlFor="password"
              className="text-900 mb-2 mt-4 block font-medium"
            >
              Contraseña
            </label>
            <IconField className="">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full"
                {...register("password", { required: true })}
              />
              <InputIcon
                className={`cursor-pointer text-xl ${
                  showPassword ? "pi pi-eye-slash" : "pi pi-eye"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </IconField>
            {errors.password && (
              <span className="text-red-600">Este campo es requerido</span>
            )}
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
