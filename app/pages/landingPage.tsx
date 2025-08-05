import { useContext, useEffect, useState } from "react";
import { Link, redirect } from "react-router";
import DestinationCard from "~/components/cards/DestinationCard";
import { UserContext } from "~/contexts/UserContext";
import { getTravels } from "~/services/getTravel";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";
import type { Travel } from "~/types/travel";

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
  const travelImage =
    "https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  const user = useContext(UserContext);
  const [upcomingTravels, setUpcomingTravels] = useState<Travel[]>([]);
  const [pastTravels, setPastTravels] = useState<Travel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      getTravels(user.id)
        .then((allTravels) => {
          // Medida de seguridad: asegurarse de que allTravels es un array
          if (Array.isArray(allTravels)) {
            const now = new Date();
            const upcoming = allTravels.filter(
              (t) => new Date(t.endDate) >= now,
            );
            const past = allTravels.filter((t) => new Date(t.endDate) < now);

            setUpcomingTravels(upcoming);
            setPastTravels(past);
          }
        })
        .catch((err) => console.error("Error fetching travels:", err))
        .finally(() => setIsLoading(false));
    }
  }, [user?.id]);


  return (
    <div className="flex flex-col gap-5 items-center justify-center p-6 max-w-6xl mx-auto sm:gap-4 ">
      <div className="flex">
        <img
          alt="logo WonderPocket"
          className="w-40 h-40"
          src="/images/WonderPocket.svg"
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full flex flex-col gap-4 items-center">
          {/* <h2 className="font-bold text-xl text-center">PRÓXIMOS VIAJES</h2> */}
          <h2 className="font-bold text-xl text-center">TUS VIAJES</h2>


          {isLoading ? (
            <p className="text-gray-500">Cargando viajes...</p>
          ) : upcomingTravels.length > 0 ? (
            upcomingTravels.map((travel) => (
              <Link
                className="w-full min-w-2xs"
                key={travel.id}
                style={{ cursor: "pointer" }}
                to={`/travel/${travel.id}/resume`}
              >
                <DestinationCard
                  endDate={travel.endDate}
                  image={travel.image ?? travelImage}
                  members={travel.companions.length + 1}
                  startDate={travel.startDate}
                  title={travel.destiny}
                />
              </Link>
            ))
          ) : (
            // <p className="text-gray-500">No tienes próximos viajes.</p>
            <p className="text-gray-500">No tienes viajes.</p>

          )}
        </div>

        {/* <div className="flex flex-col gap-4 items-center w-full">
          <h2 className="font-bold text-xl text-center">ANTERIORES VIAJES</h2>

          {isLoading ? (
            <p className="text-gray-500">Cargando viajes...</p>
          ) : pastTravels.length > 0 ? (
            pastTravels.map((travel) => (
              <Link
                className="w-full min-w-2xs"
                key={travel.id}
                style={{ cursor: "pointer" }}
                to={`/travel/${travel.id}/resume`}
              >
                <DestinationCard
                  endDate={travel.endDate}
                  image={travel.image ?? travelImage}
                  members={travel.companions.length + 1}
                  startDate={travel.startDate}
                  title={travel.destiny}
                />
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No tienes viajes anteriores.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}
