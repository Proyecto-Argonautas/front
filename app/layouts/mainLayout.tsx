import { useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router";

import MenuBar from "~/components/bars/MenuBar";
import MenuHeader from "~/components/bars/MenuHeader";
import YourTravelNavBar from "~/components/bars/YourTravelNavBar";
import YourTravelCardWithBackground from "~/components/cards/YourTravelCardWithBackground";
import LayoutTransition from "~/components/transitions/LayoutTransition";
import { MenuProvider } from "~/contexts/MenuContext";
import { SectionsProvider } from "~/contexts/SectionsContext";
import { TravelProvider, useTravel } from "~/contexts/TravelContext";
import {
  type handlePages,
  NAVIGATION_BUTTONS_COMPONENTS,
} from "~/types/navigationButtons";

export default function MainLayout() {
  return (
    <TravelProvider>
      <MenuProvider>
        <MainLayoutContent />
      </MenuProvider>
    </TravelProvider>
  );
}

function MainLayoutContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { travelData } = useTravel();

  const [count, setCount] = useState(0);

  // Configurar menu
  const matches = useMatches();
  const { hideHeader = false, buttons } = (matches.at(-1)?.handle ?? {
    hideHeader: false,
    buttons: ["home", "profile"],
  }) as handlePages;

  // Determinar si mostrar el header
  const headerView = hideHeader ? "hidden" : "flex flex-col";

  const isCompactMode =
    currentPath.includes("/itinerary") ||
    currentPath.includes("/tools") ||
    currentPath.includes("/budget");

  const styleCompactMode = isCompactMode ? "hidden" : "";

  const gridColumLayout =
    "grid h-dvh " +
    (hideHeader ? "grid-rows-[1fr_auto]" : "grid-rows-[auto_1fr_auto]");

  return (
    <SectionsProvider>
      <div className={gridColumLayout}>
        <header className={headerView}>
          <LayoutTransition>
            <div className="relative">
              <div className={styleCompactMode}>
                <MenuHeader />
              </div>
              <YourTravelCardWithBackground
                backgroundImage="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                compact={isCompactMode}
                endDate={
                  travelData?.endDate
                    ? new Date(travelData.endDate).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                      })
                    : "31/7"
                }
                participants={(travelData?.companions?.length ?? 0) + 1}
                startDate={
                  travelData?.startDate
                    ? new Date(travelData.startDate).toLocaleDateString(
                        "es-ES",
                        { day: "2-digit", month: "2-digit" },
                      )
                    : "15/7"
                }
                title={
                  travelData?.destiny
                    ? `Viaje a ${travelData.destiny}`
                    : "Viaje a Islandia"
                }
              />
            </div>
          </LayoutTransition>

          <YourTravelNavBar />
        </header>

        <main className="overflow-y-auto bg-light-secondary-100">
          {/* Aquí se carga el contenido cuando se llama al layout */}
          <Outlet context={[count, setCount]} />
        </main>
        {/* <footer className={footerView}> */}
        <footer className="relative z-50">
          <MenuBar>
            {buttons.map((key) => (
              <span key={key}>{NAVIGATION_BUTTONS_COMPONENTS[key]}</span>
            ))}
          </MenuBar>
          {/* TODO Hacer que el menu crear dependiendo de la ruta se muestre o haga una acción distinta */}
        </footer>
      </div>
    </SectionsProvider>
  );
}
