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
      {/* Layout móvil: todo vertical */}
      <div className="flex flex-col gap-5 w-full">
        <h1 className="font-bold text-xl text-center">SEGUIR PLANIFICANDO</h1>

        <div className="w-full flex flex-col gap-4 items-center">
          <Link style={{ cursor: "pointer" }} to="/travel/1/resume">
            <DestinationCard
              endDate="2024/08/10"
              image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={2}
              startDate="2024/08/01"
              title="Iceland"
            />
          </Link>

          <Link style={{ cursor: "pointer" }} to="/travel/1/resume">
            <DestinationCard
              endDate="2024/08/10"
              image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={2}
              startDate="2024/08/01"
              title="Iceland"
            />
          </Link>
        </div>

        <h1 className="font-bold text-xl text-center">TUS PRÓXIMOS VIAJES</h1>

        <div className="flex flex-col gap-4 items-center w-full">
          <Link style={{ cursor: "pointer" }} to="/travel/1/resume">
            <DestinationCard
              endDate="2024/07/10"
              image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={1}
              startDate="2024/07/01"
              title="Austria"
            />
          </Link>

          <Link style={{ cursor: "pointer" }} to="/travel/1/resume">
            <DestinationCard
              endDate="2024/09/25"
              image="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={3}
              startDate="2024/09/15"
              title="Tokyo"
            />
          </Link>

          <Link style={{ cursor: "pointer" }} to="/travel/1/resume">
            <DestinationCard
              endDate="2024/10/14"
              image="https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={2}
              startDate="2024/10/01"
              title="New York"
            />
          </Link>

          <Link style={{ cursor: "pointer" }} to="/travel/1/resume">
            <DestinationCard
              endDate="2024/11/07"
              image="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              members={4}
              startDate="2024/11/01"
              title="Paris"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
