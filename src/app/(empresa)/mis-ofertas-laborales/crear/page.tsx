import React from "react";
import FormCrearOfertaLaboral from "~/app/_components/empresa/mis-ofertas-laborales/FormCrearOfertaLaboral";
import AppBreadCrumb from "~/app/_layouts/AppBreadCrumb";

const breadcrumbItems = [
  {
    label: "Mis ofertas laborales",
    url: "/mis-ofertas-laborales",
  },
  {
    label: "Crear",
  },
];
const page = () => {
  return (
    <div>
      <AppBreadCrumb items={breadcrumbItems} />
      <FormCrearOfertaLaboral />
    </div>
  );
};

export default page;
