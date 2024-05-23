import TablaMisOfertasLaborales from "~/app/_components/empresa/mis-ofertas-laborales/TablaMisOfertasLaborales";
import AppBreadCrumb from "~/app/_layouts/AppBreadCrumb";

const breadcrumbItems = [
  {
    label: "Mis ofertas laborales",
  },
];

const page = () => {
  return (
    <>
      <AppBreadCrumb items={breadcrumbItems} />
      <TablaMisOfertasLaborales />
    </>
  );
};

export default page;
