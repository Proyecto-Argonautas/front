import { Outlet, useLocation } from "react-router";
import MenuBar from "~/components/bars/MenuBar";
import YourTravelNavBar from "~/components/bars/YourTravelNavBar";
import AddArticleButton from "~/components/buttonsComponents/AddArticleButton";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import YourTravelCardWithBackground from "~/components/cards/YourTravelCardWithBackground";
import { SectionsProvider } from "~/contexts/SectionsContext";

export default function TravelLayout() {
  const location = useLocation();

  // Determinar si estamos en una ruta que requiere modo compacto
  const isCompactMode =
    location.pathname.includes("/itinerary") ||
    location.pathname.includes("/tools") ||
    location.pathname.includes("/budget") ||
    location.pathname.includes("/packlist");

  // Determinar si estamos en la página resume
  const isResumePage =
    location.pathname.includes("/resume") || location.pathname === "/travel/1";

  return (
    <SectionsProvider>
      <div className="flex flex-col bg-light-secondary-100 min-h-screen gap-3 p-4 pb-20">
        <div className="bg-light-secondary-100 min-h-screen">
          <YourTravelCardWithBackground
            avatarUrl="https://i.pravatar.cc/40?img=56"
            backgroundImage="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            compact={isCompactMode}
            endDate="31/7"
            startDate="15/7"
            title="Viaje a Islandia"
          />

          <YourTravelNavBar />

          <Outlet />

          <MenuBar>
            <HomeButton />

            {isResumePage && <AddArticleButton />}

            <ProfileButton />
          </MenuBar>
        </div>
      </div>
    </SectionsProvider>
  );
}
