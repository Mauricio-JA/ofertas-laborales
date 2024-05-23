import TablaRevisarOfertasLaborales from "~/app/_components/admin/revisar-ofertas-laborales/TablaRevisarOfertasLaborales";
import AppBreadCrumb from "~/app/_layouts/AppBreadCrumb";

const breadcrumbItems = [
  {
    label: "Revisar ofertas laborales",
  },
];

const page = async () => {
  return (
    <>
      <AppBreadCrumb items={breadcrumbItems} />
      <TablaRevisarOfertasLaborales />
    </>
  );
};

export default page;
