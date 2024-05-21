"use client";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { Toast } from "primereact/toast";
import Label from "../common/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Inputs = {
  nombreEmpresa: string;
  telefono: string;
  email: string;
  direccion: string;
  showNombreEmpresa: boolean;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegistrarEmpresaForm = () => {
  const router = useRouter();
  const toast = React.useRef<Toast>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const schema = z.object({
    nombreEmpresa: z.string(),
    telefono: z.string().min(8),
    email: z.string().email(),
    direccion: z.string(),
    showNombreEmpresa: z.boolean().optional(),
    username: z.string().min(4),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().max(20),
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    const errorMessage = Object.values(errors)[0]?.message;
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
      life: 3000,
    });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="w-full rounded-md border-2 p-4 shadow-sm md:w-3/5">
        <div className="mb-3 text-center">
          <div className="text-900 mb-3 text-3xl font-medium">Regístrate</div>
        </div>
        {/* Error */}
        <div className="mb-2 text-center">
          <div className="text-900 mb-3 text-base font-medium text-red-600">
            {errors.nombreEmpresa && "Nombre de la empresa es requerido"}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Label htmlFor="nombreEmpresa" title="Nombre de la Empresa" />
          <InputText
            id="nombreEmpresa"
            type="text"
            placeholder="Nombre de la Empresa"
            className="mb-3 w-full"
            {...register("nombreEmpresa", { required: true })}
          />
          <div className="flex gap-3">
            <div className="w-1/2">
              <label
                htmlFor="telefono"
                className="text-900 mb-2 block font-medium"
              >
                Teléfono
              </label>
              <InputText
                id="telefono"
                type="text"
                placeholder="Teléfono"
                className="mb-3 w-full"
                {...register("telefono", { required: true })}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="text-900 mb-2 block font-medium"
              >
                Correo Electrónico
              </label>
              <InputText
                id="email"
                type="text"
                placeholder="Correo Electrónico"
                className="mb-3 w-full"
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <label
            htmlFor="direccion"
            className="text-900 mb-2 block font-medium"
          >
            Dirección
          </label>
          <InputText
            id="direccion"
            type="text"
            placeholder="Dirección"
            className="mb-3 w-full"
            {...register("direccion", { required: true })}
          />

          <Controller
            name="showNombreEmpresa"
            control={control}
            render={({ field }) => (
              <div className="mb-6 flex flex-col justify-between">
                <div className="flex items-center">
                  <Checkbox
                    inputId="hideNombreEmpresa"
                    className="mr-2"
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.checked)}
                  />
                  <label htmlFor="hideNombreEmpresa">
                    Ocultar nombre de la empresa en las ofertas laborales
                  </label>
                </div>
                <span className="text-800 ml-8 text-sm">Opcional</span>
              </div>
            )}
          />

          <label htmlFor="username" className="text-900 mb-2 block font-medium">
            Nombre de usuario
          </label>
          <InputText
            id="username"
            type="text"
            placeholder="Nombre de usuario"
            className="mb-3 w-full"
            {...register("username", { required: true })}
          />

          <label htmlFor="password" className="text-900 mb-2 block font-medium">
            Contraseña
          </label>
          <IconField className="mb-3">
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
          <label
            htmlFor="confirmPassword"
            className="text-900 mb-2 block font-medium"
          >
            Confirmar Contraseña
          </label>
          <IconField className="mb-3">
            <InputText
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              className="w-full"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === watch("password"),
              })}
            />
            <InputIcon
              className={`cursor-pointer text-xl ${
                showConfirmPassword ? "pi pi-eye-slash" : "pi pi-eye"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </IconField>
          <div className="flex gap-2">
            <Button
              label="Cancelar"
              type="button"
              severity="danger"
              className="mt-6 w-1/5"
              onClick={() => {
                router.push("/");
              }}
            />
            <Button label="Regístrate" type="submit" className="mt-6 w-4/5" />
          </div>
        </form>
      </div>
      <Toast ref={toast} position="bottom-left" />
    </div>
  );
};

export default RegistrarEmpresaForm;
