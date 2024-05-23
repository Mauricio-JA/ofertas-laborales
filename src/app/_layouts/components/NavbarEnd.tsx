import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useSession } from "next-auth/react";
import type { MenuItem } from "primereact/menuitem";

const NavbarEnd = () => {
  const { data: session, status } = useSession();

  const menuRef = React.useRef<Menu>(null);

  const items: MenuItem[] = [
    {
      label: "Cerrar sesión",
      icon: "pi pi-power-off text-red-500",
      url: "/api/auth/signout",
      style: { color: "#ff0000" },
    },
  ];

  return (
    <div className="align-items-center flex gap-2">
      {status === "loading" ? (
        <ProgressSpinner
          style={{ width: "30px", height: "30px" }}
          strokeWidth="6"
        />
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[var(--primary-color)]">
            {session?.user?.name}
          </span>
          <Avatar
            icon="pi pi-user"
            shape="circle"
            size="normal"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
            }}
            onClick={(e) => menuRef?.current?.toggle(e)}
          />
          <Menu
            model={items}
            popup
            ref={menuRef}
            id="avatar_menu"
            popupAlignment="right"
          />
        </div>
      )}
    </div>
  );
};

export default NavbarEnd;
