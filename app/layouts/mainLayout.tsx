import { Outlet, useLocation } from "react-router";
import React from "react";
import MenuBar from "~/components/bars/MenuBar";
import AddArticleButton from "~/components/buttonsComponents/AddArticleButton";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";
import SearchButton from "~/components/buttonsComponents/SearchButton";
import YourTravelCardWithBackground from "~/components/cards/YourTravelCardWithBackground";
import YourTravelNavBar from "~/components/bars/YourTravelNavBar";
import MenuHeader from "~/components/bars/MenuHeader";
import LayoutTransition from "~/components/transitions/LayoutTransition";
import { SectionsProvider } from "~/contexts/SectionsContext";
import { TravelProvider, useTravel } from "~/contexts/TravelContext";


export default function MainLayout() {
  return (
    <TravelProvider>
      <MainLayoutContent />
    </TravelProvider>
  );
}

function MainLayoutContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { travelData } = useTravel();

  const [count, setCount] = React.useState(0);

  // Determinar si mostrar el header 
  const headerView = currentPath.includes("/travel") && !currentPath.includes("/create") 
    ? "flex flex-col" 
    : "hidden";

  // Determinar si mostrar el footer (solo móvil)
  const footerView = "block sm:hidden";

  const isCompactMode =
    currentPath.includes("/itinerary") ||
    currentPath.includes("/tools") ||
    currentPath.includes("/budget");

  // Función para determinar qué botones mostrar según la ruta
  const getMenuButtons = () => {
    // Landing page: Search, Create, Profile
    if (currentPath === "/") {
      return (
        <>
          <SearchButton />
          <CreateButton />
          <ProfileButton />
        </>
      );
    }
    
    // Create page: Home, Profile
    if (currentPath.includes("/create")) {
      return (
        <>
          <HomeButton />
          <ProfileButton />
        </>
      );
    }
    
    // Resume page: Home, AddArticle, Profile
    if (currentPath.includes("/resume")) {
      return (
        <>
          <HomeButton />
          <AddArticleButton />
          <ProfileButton />
        </>
      );
    }
    
    // Itinerary, Tools, Budget pages: Home, Profile
    if (currentPath.includes("/itinerary") || 
        currentPath.includes("/tools") || 
        currentPath.includes("/budget")) {
      return (
        <>
          <HomeButton />
          <ProfileButton />
        </>
      );
    }

    // Profile page: Home, Return
    if (currentPath.includes("/profile")) {
      return (
        <>
          <ReturnButton />
          <HomeButton />
        </>
      );
    }

    // Por defecto: mostrar todos los botones
    return (
      <>
        <SearchButton />
        <HomeButton />
        <CreateButton />
        <ProfileButton />
      </>
    );
  };

  return (
    <SectionsProvider>
      <header className={headerView}>
        <LayoutTransition>
          <div className="relative">
            {/* MenuHeader solo en desktop */}
            <div className="hidden sm:block">
              <MenuHeader />
            </div>
            <YourTravelCardWithBackground
              backgroundImage="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              compact={isCompactMode}
              endDate={travelData.endDate ? new Date(travelData.endDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : "31/7"}
              participants={(travelData.numberOfMembers || 0) + 1}
              startDate={travelData.startDate ? new Date(travelData.startDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : "15/7"}
              title={travelData.destination ? `Viaje a ${travelData.destination}` : "Viaje a Islandia"}
            />
          </div>
        </LayoutTransition>

        <YourTravelNavBar />


      </header>





      <main className="min-h-screen bg-light-secondary-100">
        {/* Aqui se carga el contenido cuando se llama al layout */}
        <Outlet context={[count, setCount]}/>
      </main>
      <footer className={footerView}>
        
        
        
        <MenuBar>
          {getMenuButtons()}
        </MenuBar>
        {/* TODO Hacer que el menu crear dependiendo de la ruta se muestre o haga una accion distinta */}
      </footer>
    </SectionsProvider>
  );
}
