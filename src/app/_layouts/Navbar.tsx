"use client";

import Image from "next/image";
// import { Avatar } from "primereact/avatar";
// import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import React from "react";

// type Props = {};

const Navbar = () => {
  const items: MenuItem[] = [
    // {
    //   label: "Inicio",
    //   icon: "pi pi-home",
    // },
  ];

  const start = (
    <div className="flex items-center gap-2">
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
  const end = (
    <div className="align-items-center flex gap-2">
      {/* <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      /> */}
      {/* <Button>Iniciar Sesión</Button> */}
    </div>
  );
  return (
    <Menubar
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
      model={items}
      start={start}
      end={end}
    />
  );
};

export default Navbar;
