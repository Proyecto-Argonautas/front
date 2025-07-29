import MenuBar from "~/components/bars/MenuBar";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import SearchButton from "~/components/buttonsComponents/SearchButton";

import { DesktopLanding } from "~/components/landing/DesktopLanding";
import { MobileLanding } from "~/components/landing/MobileLanding";

export function meta() {
  return [{ title: "Travels" }, { name: "resume", content: "Travels" }];
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex flex-col gap-5 items-center justify-center pt-6 sm:pt-4 pb-25 px-4 max-w-6xl mx-auto sm:gap-4 ">
        {/* Layout móvil: todo vertical */}
        <MobileLanding />

        {/* Layout escritorio: dos columnas lado a lado */}
        <DesktopLanding />

        <MenuBar>
          <SearchButton />
          <CreateButton />
          <ProfileButton />
        </MenuBar>
      </main>
    </div>
  );
}
