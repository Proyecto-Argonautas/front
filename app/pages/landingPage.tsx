import { DesktopLanding } from "~/components/landing/DesktopLanding";
import { MobileLanding } from "~/components/landing/MobileLanding";

export function meta() {
  return [{ title: "Travels" }, { name: "resume", content: "Travels" }];
}

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center pt-6 sm:pt-4 pb-25 px-4 max-w-6xl mx-auto sm:gap-4 ">
      {/* Layout móvil: todo vertical */}
      <div className="min-[700px]:hidden">
        <MobileLanding />
      </div>

      {/* Layout escritorio: dos columnas lado a lado */}
      <div className="hidden min-[700px]:block">
        <DesktopLanding />
      </div>
    </div>
  );
}
