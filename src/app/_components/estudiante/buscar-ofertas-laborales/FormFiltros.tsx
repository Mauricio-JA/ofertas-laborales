import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React from "react";
import Label from "../../common/Label";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const FormFiltros = () => {
  return (
    <Card
      header={
        <div className="flex w-full justify-between px-5 pt-5">
          <h1 className="inline-block text-2xl font-semibold">
            Filtros
            <i className="pi pi-filter-fill" />
          </h1>
        </div>
      }
    >
      <form>
        <Label htmlFor="ubicacion" title="Ubicación:" />
        <InputText id="ubicacion" className="p-inputtext-sm w-full" size={5} />
        <Label
          htmlFor="tipoTrabajo"
          title="Tipo de Trabajo:"
          className="mt-3"
        />
        <Dropdown
          id="tipoTrabajo"
          className=" p-inputtext-sm w-full"
          options={[]}
        />
        <Label
          htmlFor="fechaPublicacion"
          title="Fecha de Publicación:"
          className="mt-3"
        />
        <Calendar
          id="fechaPublicacion"
          className="p-inputtext-sm w-full"
          showIcon
        />
        <div className="mt-6 flex justify-end">
          <Button label="Aplicar" size="small" />
        </div>
      </form>
    </Card>
  );
};

export default FormFiltros;
