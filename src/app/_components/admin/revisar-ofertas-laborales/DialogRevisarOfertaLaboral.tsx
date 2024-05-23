import { Button } from "primereact/button";
import { Dialog, type DialogProps } from "primereact/dialog";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { tipoEmpleoOptions } from "~/helpers/data";
import { api } from "~/trpc/react";
import type { OfertaLaboralByEstadoRevisionOutput } from "~/types/trpcInfers";

const DialogRevisarOfertaLaboral = ({
  ofertaLaboral,
  onAprove,
  onReject,
  ...props
}: DialogProps & {
  ofertaLaboral?: OfertaLaboralByEstadoRevisionOutput[0];
  onAprove: () => void;
  onReject: () => void;
}) => {
  const toast = useRef<Toast>(null);

  const aprobar = api.ofertaLaboral.approve.useMutation({
    onSuccess: () => onAprove(),
    onError: () => {
      console.log("Error");
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al aprobar la oferta laboral",
      });
    },
  });

  const rechazar = api.ofertaLaboral.reject.useMutation({
    onSuccess: () => onReject(),
    onError: () => {
      console.log("Error");
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al rechazar la oferta laboral",
      });
    },
  });

  return (
    <Dialog
      {...props}
      header={"Revisar Oferta Laboral"}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button
            icon="pi pi-check"
            severity="success"
            label="Aprobar"
            loading={aprobar.isPending || rechazar.isPending}
            disabled={
              ofertaLaboral?.id === undefined ||
              aprobar.isPending ||
              rechazar.isPending
            }
            onClick={() => {
              const id = ofertaLaboral?.id;
              if (id) {
                aprobar.mutate({ id });
              }
            }}
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            label="Rechazar"
            loading={aprobar.isPending || rechazar.isPending}
            disabled={
              ofertaLaboral?.id === undefined ||
              aprobar.isPending ||
              rechazar.isPending
            }
            onClick={() => {
              const id = ofertaLaboral?.id;
              if (id) {
                rechazar.mutate({ id });
              }
            }}
          />
        </div>
      }
    >
      <Panel header={ofertaLaboral?.titulo ?? ""}>
        <div className="flex flex-col gap-4">
          <p>
            <span className="font-bold">Empresa:</span>{" "}
            {ofertaLaboral?.empresa.nombre}
          </p>
          <p>
            <span className="font-bold">Descripcion:</span>{" "}
            {ofertaLaboral?.descripcion}
          </p>
          <p>
            <span className="font-bold">Tipo Trabajo:</span>{" "}
            {
              tipoEmpleoOptions.find(
                (tipo) => tipo.value === ofertaLaboral?.tipoTrabajo,
              )?.label
            }
          </p>
          <p>
            <span className="font-bold">Ubicacion:</span>{" "}
            {ofertaLaboral?.ubicacion}
          </p>
          <p>
            <span className="font-bold">Vacantes:</span>{" "}
            {ofertaLaboral?.vacantes}
          </p>
          <p>
            <span className="font-bold">Area de Interes:</span>{" "}
            {ofertaLaboral?.areasInteres.map((area) => area.nombre).join(", ")}
          </p>

          <p>
            <span className="font-bold">Estado:</span> {ofertaLaboral?.estado}
          </p>
        </div>
        <Toast ref={toast} position="bottom-left" />
      </Panel>
    </Dialog>
  );
};

export default DialogRevisarOfertaLaboral;
