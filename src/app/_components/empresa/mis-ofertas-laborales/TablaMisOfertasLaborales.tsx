import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { api } from "~/trpc/server";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Link from "next/link";

export default async function TablaMisOfertasLaborales() {
  const ofertasLaborales = await api.ofertaLaboral.getByIdEmpresa();

  return (
    <Card
      header={
        <div className="flex w-full justify-between px-5 pt-5">
          <h1 className="text-2xl font-semibold">Mis ofertas laborales</h1>
          <div className="flex flex-wrap justify-end gap-3">
            <Link href="/mis-ofertas-laborales/crear">
              <Button
                label="Crear oferta laboral"
                icon="pi pi-plus"
                size="small"
              />
            </Link>
          </div>
        </div>
      }
    >
      <DataTable
        paginator
        rows={10}
        value={ofertasLaborales}
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay ofertas laborales registradas"
        showGridlines
      >
        <Column field="titulo" header="Titulo"></Column>
        <Column field="tipoTrabajo" header="Tipo Trabajo"></Column>
        <Column field="ubicacion" header="Ubicacion"></Column>
        <Column field="vacantes" header="Vacantes"></Column>
        <Column field="estado" header="Estado"></Column>
      </DataTable>
    </Card>
  );
}
