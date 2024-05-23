import "~/styles/globals.css";
import "primereact/resources/themes/viva-light/theme.css";
import "primeicons/primeicons.css";

import { GeistSans } from "geist/font/sans";

import { PrimeReactProvider } from "primereact/api";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_layouts/Navbar";

export const metadata = {
  title: "Portal Laboral",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} `}>
      <body>
        <TRPCReactProvider>
          <PrimeReactProvider>
            <Navbar />
            <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              {children}
            </main>
          </PrimeReactProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
