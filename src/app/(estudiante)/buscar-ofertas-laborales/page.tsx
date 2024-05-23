import React from "react";
import BuscarOfertasLaboralesComponent from "~/app/_components/estudiante/buscar-ofertas-laborales/BuscarOfertasLaboralesComponent";
import AppBreadCrumb from "~/app/_layouts/AppBreadCrumb";

const breadcrumbItems = [
  {
    label: "Buscar ofertas laborales",
  },
];

const page = () => {
  return (
    <div>
      <AppBreadCrumb items={breadcrumbItems} />
      <BuscarOfertasLaboralesComponent />
    </div>
  );
};

export default page;
