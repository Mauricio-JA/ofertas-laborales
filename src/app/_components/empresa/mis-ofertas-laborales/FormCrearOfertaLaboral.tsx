"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { Toast } from "primereact/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "../../common/Label";
import type { EnumTipoTrabajo, Profesion } from "@prisma/client";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { tipoEmpleoOptions } from "~/helpers/data";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import {} from "primereact/autocomplete";
import { api } from "~/trpc/react";
import { schemaCrearOfertaLaboral } from "~/helpers/schemas";
import { useRouter } from "next/navigation";

type Inputs = {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  tipoEmpleo: EnumTipoTrabajo;
  areasDeInteres: Profesion["id"];
  vacantes: number;
  checkMostrarNombreEmpresa: boolean;
};

const FormCrearOfertaLaboral = () => {
  const toast = React.useRef<Toast>(null);
  const router = useRouter();

  const profesiones = api.profesion.search.useQuery({ search: "" });
  const submitOfertaLaboral = api.ofertaLaboral.create.useMutation({
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        summary: "Oferta Laboral",
        detail: "Oferta Laboral creada correctamente",
      });
      router.push("/mis-ofertas-laborales");
    },
    onError: (error) => {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Oferta Laboral",
        detail: "Ocurrió un error al crear la oferta laboral",
      });
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schemaCrearOfertaLaboral),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitOfertaLaboral.mutate(data);
  };

  const onError: SubmitErrorHandler<Inputs> = (errors) => {
    console.log(errors);
  };
  const getFormErrorMessage = (name: string) => {
    return (
      errors?.[name as keyof Inputs] && (
        <small className="p-error">
          {errors?.[name as keyof Inputs]?.message}
        </small>
      )
    );
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full rounded-md border-2 p-4 shadow-sm md:w-3/5">
        <div className="mb-3 text-center">
          <div className="text-900 mb-3 text-3xl font-medium">
            Registrar Oferta Laboral
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Label htmlFor="titulo" title="Título" className="mt-3" />
          <Controller
            name="titulo"
            control={control}
            rules={{ required: "Titulo Requerido" }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                autoFocus
                invalid={fieldState.invalid}
                className={classNames("w-full")}
              />
            )}
          />
          {getFormErrorMessage("titulo")}

          <Label htmlFor="descripcion" title="Descripción" className="mt-3" />
          <Controller
            name="descripcion"
            control={control}
            rules={{ required: "Descripcion Requerida" }}
            render={({ field, fieldState }) => (
              <InputTextarea
                id={field.name}
                {...field}
                rows={2}
                invalid={fieldState.invalid}
                className={classNames("w-full")}
              />
            )}
          />
          {getFormErrorMessage("descripcion")}

          <div className="flex gap-3">
            <div className="mt-3 w-1/2">
              <Label htmlFor="ubicacion" title="Ubicación" />
              <Controller
                name="ubicacion"
                control={control}
                rules={{ required: "Ubicacion Requerida" }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    invalid={fieldState.invalid}
                    className={classNames("w-full")}
                  />
                )}
              />
              {getFormErrorMessage("ubicacion")}
            </div>
            <div className="mt-3 w-1/2">
              <Label htmlFor="tipoEmpleo" title="Tipo de Empleo" />
              <Controller
                name="tipoEmpleo"
                control={control}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={tipoEmpleoOptions}
                    optionLabel="label"
                    invalid={fieldState.invalid}
                    className={classNames("w-full")}
                  />
                )}
              />
              {getFormErrorMessage("tipoEmpleo")}
            </div>
          </div>
          <Label
            htmlFor="areasDeInteres"
            title="Área de Interés"
            className="mt-3"
          />
          <Controller
            name="areasDeInteres"
            control={control}
            render={({ field }) => (
              <Dropdown
                id={field.name}
                {...field}
                optionLabel="nombre"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={profesiones?.data ?? []}
                optionValue="id"
                className="w-full"
              />
            )}
          />
          {getFormErrorMessage("areasDeInteres")}

          <Label htmlFor="vacantes" title="Vacantes" className="mt-3" />
          <Controller
            name="vacantes"
            control={control}
            rules={{ required: "Vacantes Requeridas" }}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                showButtons
                step={1}
                invalid={fieldState.invalid}
              />
            )}
          />
          {getFormErrorMessage("vacantes")}

          <Controller
            name="checkMostrarNombreEmpresa"
            control={control}
            render={({ field }) => (
              <div className="mt-3 flex flex-col justify-between">
                <div className="flex items-center">
                  <Checkbox
                    inputId="checkMostrarNombreEmpresa"
                    {...field}
                    className="mr-2"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.checked)}
                  />
                  <label htmlFor="checkMostrarNombreEmpresa">
                    Ocultar nombre de la empresa para esta oferta
                  </label>
                </div>
              </div>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              label="Enviar a Revisón"
              type="submit"
              className="mt-6"
              loading={submitOfertaLaboral.isPending}
            />
          </div>
        </form>
      </div>
      <Toast ref={toast} position="bottom-left" />
    </div>
  );
};

export default FormCrearOfertaLaboral;
