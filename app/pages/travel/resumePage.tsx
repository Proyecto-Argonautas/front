import WidgetBudget from "~/components/budget/WidgetBudget";
import SectionsRenderer from "~/components/sections/SectionsRenderer";
import NewArticleButton from "~/components/buttonsComponents/NewArticleButton";
import { useBudget } from "~/hooks/useBudget";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "resume", content: "Nombre viaje" },
  ];
}

export const handle: handlePages = {
  buttons: ["home", "addArticle", "profile"],
};

export default function ResumePage() {
  const { total } = useBudget();

  return (
    <div className="p-4 space-y-4 relative">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Área principal - Secciones en grid 2 columnas en desktop */}
        <div className="flex-1">
          <div className="hidden lg:block">
            {/* Layout desktop: grid 2 columnas + botón centrado abajo */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <SectionsRenderer />
              </div>
              <div className="space-y-4">
                {/* Aquí se renderizan más secciones si existen */}
              </div>
            </div>
            
            {/* Botón centrado abajo del grid */}
            <div className="flex  justify-center w-full">
              <NewArticleButton />
            </div>
          </div>

          {/* Layout móvil/tablet: columna simple */}
          <div className="lg:hidden">
            <SectionsRenderer />
            <div className="flex justify-center w-full pt-6">
              <NewArticleButton />
            </div>
          </div>
        </div>

        {/* Columna derecha - Presupuesto (separada) */}
        <div className="xl:w-80 xl:mt-0">
          <WidgetBudget currency="€" title="PRESUPUESTO TOTAL" total={total} />
        </div>
      </div>
    </div>
  );
}
