import { Link, redirect } from "react-router";
import DestinationCard from "~/components/cards/DestinationCard";
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
    <div className="flex flex-col gap-5 items-center justify-center p-6 max-w-6xl mx-auto sm:gap-4 ">

      <div className="flex">
        <img src="/images/WonderPocket.svg" alt="logo WonderPocket" className="w-40 h-40" />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full flex flex-col gap-4 items-center">
          <h2 className="font-bold text-xl text-center">SEGUIR PLANIFICANDO</h2>

          <Link
            className="w-full min-w-2xs"
            style={{ cursor: "pointer" }}
            to="/travel/1/resume"
          >
            <DestinationCard
              endDate="2024/08/10"
              image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={2}
              startDate="2024/08/01"
              title="Iceland"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className="font-bold text-xl text-center">PRÓXIMOS VIAJES</h2>
        </div>

        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className="font-bold text-xl text-center">ANTERIORES VIAJES</h2>
        </div>
      </div>
    </div>
  );
}
