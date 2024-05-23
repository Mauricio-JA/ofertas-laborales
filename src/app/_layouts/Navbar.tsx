"use client";

import { SessionProvider } from "next-auth/react";

import React from "react";
import DynamicNavbarItems from "~/app/_layouts/components/DynamicNavbarItems";

// type Props = {};

const Navbar = () => {
  return (
    <SessionProvider>
      <DynamicNavbarItems />
    </SessionProvider>
  );
};

export default Navbar;
