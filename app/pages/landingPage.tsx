import { redirect } from "react-router";
import { DesktopLanding } from "~/components/landing/DesktopLanding";
import { MobileLanding } from "~/components/landing/MobileLanding";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [{ title: "Travels" }, { name: "resume", content: "Travels" }];
}

export const handle: handlePages = {
  hideHeader: true,
  buttons: ["home", "create", "profile"],
};

export async function clientLoader() {
  // Comprueba si el usuario está autenticado
  if (!(await isUserAuthenticated())) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return redirect("/user/login");
  }
  // Si está autenticado, no hagas nada y permite que la ruta se cargue
  return null;
}

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center pt-6 sm:pt-4 pb-25 px-4 max-w-6xl mx-auto sm:gap-4 ">
      {/* Layout móvil: todo vertical */}
      <div className="min-[700px]:hidden">
        <MobileLanding />
      </div>

      {/* Layout escritorio: dos columnas lado a lado */}
      <div className="hidden min-[700px]:block">
        <DesktopLanding />
      </div>
    </div>
  );
}
