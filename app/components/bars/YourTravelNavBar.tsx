// import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useTravel } from "~/contexts/TravelContext";

const tabs = ["Resumen", "Itinerario", "Equipaje", "Gastos"];

// Mapeo de nombres en español a rutas en inglés
const tabRoutes: { [key: string]: string } = {
  Resumen: "resume",
  Itinerario: "itinerary",
  Equipaje: "tools",
  Gastos: "budget",
};

const YourTravelNavBar = () => {
  const [activeTab, setActiveTab] = useState("Resumen");
  const { travelData } = useTravel();
  const location = useLocation();

  // Determinar si estamos en Resume (no compacto) para esquinas redondeadas abajo
  const isResumeMode =
    location.pathname.includes("/resume") ||
    location.pathname.match(/\/travel\/\d+\/?$/);

  // Determinar qué tab está activo basado en la URL
  const getActiveTabFromLocation = () => {
    if (isResumeMode) {
      return "Resumen";
    } else if (location.pathname.includes("/itinerary")) {
      return "Itinerario";
    } else if (location.pathname.includes("/tools")) {
      return "Equipaje";
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
      <div
        className={`bg-light-primary shadow-sm -mt-3 -mb-2 ${
          isResumeMode ? "rounded-xl" : "rounded-t-xl"
        }`}
      >
        <div className="overflow-x-auto px-2 sm:px-4 scrollbar-hide">
          <div className="flex space-x-5 min-w-max items-center sm:min-w-0 sm:justify-center sm:space-x-24">
            {tabs.map((tab, index) => (
              <NavLink
                className={`pt-6 pb-4 sm:pt-7 sm:pb-5 font-semibold text-sm sm:text-base transition-all duration-300 whitespace-nowrap flex items-center z-10 ${
                  activeTab === tab
                    ? "text-emerald-400 decoration-solid underline underline-offset-10 decoration-2"
                    : "text-gray-600 hover:text-gray-800"
                } ${index === 0 ? "ml-2 sm:ml-0" : ""}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                to={
                  travelData && 'id' in travelData && typeof travelData.id === 'string' // Check if travelData is a valid object with an 'id' property of type string
                    ? `/travel/${travelData.id}/${tabRoutes[tab]}` // Use travelData.id if available
                    : '#' // Fallback to '#' or a default route if travelData.id is not available
                }
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
