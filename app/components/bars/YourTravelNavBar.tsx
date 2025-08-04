// import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

const tabs = ["Resumen", "Itinerario", "Herramientas", "Gastos"];

// Mapeo de nombres en español a rutas en inglés
const tabRoutes: { [key: string]: string } = {
  Resumen: "resume",
  Itinerario: "itinerary",
  Herramientas: "tools",
  Gastos: "budget",
};

const YourTravelNavBar = () => {
  const [activeTab, setActiveTab] = useState("Resumen");
  const location = useLocation();

  // Determinar si estamos en Resume (no compacto) para esquinas redondeadas abajo
  const isResumeMode =
    location.pathname.includes("/resume") ||
    location.pathname.match(/\/travel\/\d+\/?$/);

  // Determinar qué tab está activo basado en la URL
  const getActiveTabFromLocation = () => {
    if (
      location.pathname.includes("/resume") ||
      location.pathname.match(/\/travel\/\d+\/?$/)
    ) {
      return "Resumen";
    } else if (location.pathname.includes("/itinerary")) {
      return "Itinerario";
    } else if (location.pathname.includes("/tools")) {
      return "Herramientas";
    } else if (location.pathname.includes("/budget")) {
      return "Gastos";
    }
    return "Resumen";
  };

  // Actualizar activeTab cuando cambie la location
  useEffect(() => {
    setActiveTab(getActiveTabFromLocation());
  }, [location.pathname]);

  return (
    <>
      <style>{`
				.hide-scrollbar {
					-ms-overflow-style: none;  /* Internet Explorer 10+ */
					scrollbar-width: none;  /* Firefox */
				}
				.hide-scrollbar::-webkit-scrollbar {
					display: none;  /* Safari and Chrome */
				}
			`}</style>
      <div
        className={`bg-light-primary shadow-sm -mt-3 -mb-2 ${
          isResumeMode ? "rounded-xl" : "rounded-t-xl"
        }`}
      >
        <div className="overflow-x-auto px-2 sm:px-4 hide-scrollbar">
          <div className="flex space-x-5 min-w-max items-center sm:min-w-0 sm:justify-center sm:space-x-24">
            {tabs.map((tab, index) => (
              <NavLink
                className={`pt-6 pb-4 sm:pt-7 sm:pb-5 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex items-center ${
                  activeTab === tab
                    ? "text-emerald-400 border-b-2 border-emerald-400"
                    : "text-gray-600"
                } ${index === 0 ? "ml-2 sm:ml-0" : ""}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                to={`/travel/1/${tabRoutes[tab]}`}
              >
                {tab}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourTravelNavBar;
