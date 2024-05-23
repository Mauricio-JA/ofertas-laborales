import Link from "next/link";
import { Button } from "primereact/button";

export default function NotFound() {
  // not found page with a link to the home page with tailwindcss
  return (
    <div className="flex  h-[calc(100vh-80px)] flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-4xl">Página no encontrada</h2>
      <Link href="/">
        <Button className="mt-4">Volver a Inicio</Button>
      </Link>
    </div>
  );
}
