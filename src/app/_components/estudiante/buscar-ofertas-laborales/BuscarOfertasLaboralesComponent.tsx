"use client";

import React from "react";
import FormFiltros from "./FormFiltros";
import ListaOfertasLaborales from "./ListaOfertasLaborales";
import { api } from "~/trpc/react";

const BuscarOfertasLaboralesComponent = () => {
  const ofertasLaborales = api.ofertaLaboral.searchActiveByTitle.useQuery({
    title: "",
  });

  return (
    <div className="flex gap-2">
      <div className="w-1/4">
        <FormFiltros />
      </div>
      <div className="flex-1">
        <ListaOfertasLaborales
          ofertasLaborales={ofertasLaborales.data ?? []}
          loading={ofertasLaborales.isLoading}
        />
      </div>
    </div>
  );
};

export default BuscarOfertasLaboralesComponent;
