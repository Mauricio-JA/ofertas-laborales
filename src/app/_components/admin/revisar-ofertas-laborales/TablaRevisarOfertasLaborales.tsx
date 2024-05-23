"use client";

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { OfertaLaboralByEstadoRevisionOutput } from "~/types/trpcInfers";
import DialogRevisarOfertaLaboral from "./DialogRevisarOfertaLaboral";
import { Tag } from "primereact/tag";
import { api } from "~/trpc/react";

export default function TablaRevisarOfertasLaborales() {
  const [visible, setVisible] = useState(false);

  const utils = api.useUtils();
  const ofertasLaborales = api.ofertaLaboral.getByEstadoRevision.useQuery();
  const [selectedOfertaLaboral, setSelectedOfertaLaboral] =
    useState<OfertaLaboralByEstadoRevisionOutput[0]>();

  const onClose = () => {
    setVisible(false);
    setSelectedOfertaLaboral(undefined);
  };

  const handleAproveOrReject = async () => {
    onClose();
    await utils.ofertaLaboral.getByEstadoRevision.invalidate();
  };

  const actionBodyTemplate = (
    rowData: OfertaLaboralByEstadoRevisionOutput[0],
  ) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-verified"
          size="small"
          tooltip="Revisar"
          onClick={() => {
            setVisible(true);
            setSelectedOfertaLaboral(rowData);
          }}
        />
      </div>
    );
  };

  return (
    <Card
      header={
        <div className="flex w-full justify-between px-5 pt-5">
          <h1 className="text-2xl font-semibold">
            Revisar ofertas laborales pendientes
          </h1>
        </div>
      }
    >
      <DialogRevisarOfertaLaboral
        onAprove={handleAproveOrReject}
        onReject={handleAproveOrReject}
        className="md:w-1/3"
        header="Revisar Oferta Laboral"
        visible={visible}
        ofertaLaboral={selectedOfertaLaboral}
        onHide={onClose}
      />
      <DataTable
        value={ofertasLaborales.data ?? []}
        loading={ofertasLaborales.isLoading}
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay ofertas laborales registradas"
        showGridlines
      >
        <Column field="empresa.nombre" header="Empresa" />
        <Column field="titulo" header="Titulo" />
        <Column field="tipoTrabajo" header="Tipo Trabajo" />
        <Column field="ubicacion" header="Ubicacion" />
        <Column field="vacantes" header="Vacantes" />
        <Column
          field="estado"
          header="Estado"
          body={<Tag value="PENDIENTE" severity="warning" />}
        />
        <Column
          body={actionBodyTemplate}
          exportable={false}
          header="Acciones"
        />
      </DataTable>
    </Card>
  );
}
