"use client";
import { useRouter } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import type { MenuItem } from "primereact/menuitem";
import React from "react";

type Props = {
  items: MenuItem[];
};

const AppBreadCrumb = ({ items = [] }: Props) => {
  const router = useRouter();
  const handleUrl = (url: string) => {
    router.push(url);
  };
  return (
    <BreadCrumb
      className="my-2 max-w-fit"
      model={items.map((item) => ({
        ...item,
        command: () => item?.url && handleUrl(item.url),
        url: undefined,
      }))}
      home={{
        icon: "pi pi-home",
        command: () => handleUrl("/"),
      }}
    />
  );
};

export default AppBreadCrumb;
