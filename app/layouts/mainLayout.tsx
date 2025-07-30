import { Outlet, useLocation } from "react-router";

import MenuBar from "~/components/bars/MenuBar";
import AddArticleButton from "~/components/buttonsComponents/AddArticleButton";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";
import SearchButton from "~/components/buttonsComponents/SearchButton";
import YourTravelCardWithBackground from "~/components/cards/YourTravelCardWithBackground";
import YourTravelNavBar from "~/components/bars/YourTravelNavBar";
import { SectionsProvider } from "~/contexts/SectionsContext";

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determinar si mostrar el header
  const headerView = currentPath.includes("/travel") && !currentPath.includes("/create") 
    ? "flex flex-col" 
    : "hidden";

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
        <YourTravelCardWithBackground
          avatarUrl="https://i.pravatar.cc/40?img=56"
          backgroundImage="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          compact={isCompactMode}
          endDate="31/7"
          startDate="15/7"
          title="Viaje a Islandia"
        />

        <YourTravelNavBar />


      </header>





      <main className="min-h-screen bg-light-secondary-100">
        {/* Aqui se carga el contenido cuando se llama al layout */}
        <Outlet />
      </main>
      <footer>
        <MenuBar>
          {getMenuButtons()}
        </MenuBar>
        {/* TODO Hacer que el menu crear dependiendo de la ruta se muestre o haga una accion distinta */}
      </footer>
    </SectionsProvider>
  );
}
