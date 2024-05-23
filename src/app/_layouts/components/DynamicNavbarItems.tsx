import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import React from "react";
import NavbarEnd from "~/app/_layouts/components/NavbarEnd";

const DynamicNavbarItems = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleUrl = (url: string) => {
    router.push(url);
  };

  const start = (
    <div className="mr-4 flex items-center gap-2">
      <Image
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        height={40}
        width={40}
      />
      <h1
        className="text-2xl font-semibold text-slate-700
        "
      >
        PortalLaboral
      </h1>
    </div>
  );

  const items: Record<number, MenuItem[]> = {
    0: [],
    1: [
      {
        label: "Inicio",
        icon: "pi pi-fw pi-home",
        command: () => handleUrl("/"),
      },
      {
        label: "Usuarios",
        icon: "pi pi-fw pi-user",
        command: () => handleUrl("/usuarios"),
      },
      {
        label: "Revisar Ofertas Laborales",
        icon: "pi pi-fw pi-briefcase",
        command: () => handleUrl("/revisar-ofertas-laborales"),
      },
      {
        label: "Reportes",
        icon: "pi pi-fw pi-chart-bar",
        command: () => handleUrl("/reportes"),
      },
    ],
    2: [
      {
        label: "Inicio",
        icon: "pi pi-fw pi-home",
        command: () => handleUrl("/"),
      },
      {
        label: "Mis Ofertas Laborales",
        icon: "pi pi-fw pi-briefcase",
        command: () => handleUrl("/mis-ofertas-laborales"),
      },
      {
        label: "Postulantes",
        icon: "pi pi-fw pi-users",
        command: () => handleUrl("/postulantes"),
      },
    ],
    3: [
      {
        label: "Inicio",
        icon: "pi pi-fw pi-home",
        command: () => handleUrl("/"),
      },
      {
        label: "Buscar Trabajos",
        icon: "pi pi-fw pi-briefcase",
        command: () => handleUrl("/buscar-ofertas-laborales"),
      },
      {
        label: "Mis postulaciones",
        icon: "pi pi-fw pi-folder",
        command: () => handleUrl("/mis-postulaciones"),
      },
    ],
  };

  return (
    <Menubar
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
      model={items[session?.user?.tipoUsuario ?? 0] ?? []}
      start={start}
      end={<NavbarEnd />}
    />
  );
};

export default DynamicNavbarItems;
