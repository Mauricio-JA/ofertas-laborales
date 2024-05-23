import { DataView } from "primereact/dataview";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React from "react";
import type { SearchActiveOferLaboralByTitleOutput } from "~/types/trpcInfers";
import "/node_modules/primeflex/primeflex.css";
import { classNames } from "primereact/utils";
import { tipoEmpleoOptions } from "~/helpers/data";

type Props = {
  ofertasLaborales: SearchActiveOferLaboralByTitleOutput;
  loading: boolean;
};

const ListaOfertasLaborales = ({ ofertasLaborales, loading }: Props) => {
  const itemTemplate = (item: SearchActiveOferLaboralByTitleOutput[0]) => {
    if (!item) {
      return;
    }

    return gridItem(item);
  };

  const header = () => {
    return (
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="inline-block text-2xl font-semibold">
          Ofertas de Trabajo
        </h1>
        <IconField>
          <InputIcon className="pi pi-search" />
          <InputText className="p-inputtext-sm" placeholder="Buscar" />
        </IconField>
      </div>
    );
  };
  return (
    <div className="w-full">
      <DataView
        value={ofertasLaborales}
        loading={loading}
        layout={"grid"}
        itemTemplate={itemTemplate}
        emptyMessage={"No se encontraron ofertas de treabajo. 🤷‍♂️"}
        header={header()}
        paginator
        rows={9}
      />
    </div>
  );
};

export default ListaOfertasLaborales;

const gridItem = (item: SearchActiveOferLaboralByTitleOutput[0]) => {
  return (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4  p-2 " key={item.id}>
      <div
        className="border-1 cursor-pointer rounded-sm p-4 shadow-sm transition-colors duration-200 ease-in-out hover:bg-slate-50"
        onClick={() => {
          console.log("click");
        }}
      >
        <div className="flex-column flex">
          <div className="text-lg font-bold leading-4 ">{item.titulo}</div>
          <div
            className={classNames(
              "mb-3 font-semibold",
              item.mostrarNombreEmpresa
                ? "text-sm"
                : "text-xs italic text-gray-500",
            )}
          >
            {item.mostrarNombreEmpresa
              ? item.empresa.nombre
              : "Nombre de empresa no disponible"}
          </div>
          <div className="text-sm leading-4">
            <Tag
              value={
                tipoEmpleoOptions.find(
                  (tipo) => tipo.value === item.tipoTrabajo,
                )?.label
              }
            />
          </div>
          <div className="text-sm leading-4">{item.ubicacion}</div>
          <div className="text-sm leading-4">
            {item.fechaPublicacion?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
