import WidgetBudget from "~/components/budget/WidgetBudget";
import SectionsRenderer from "~/components/sections/SectionsRenderer";
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
    <div className="p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Columna izquierda - Secciones */}
        <div className="flex-1">
          <SectionsRenderer />
        </div>

        {/* Columna derecha - Presupuesto */}
        <div className="lg:w-80 lg:mt-5">
          <WidgetBudget currency="€" title="PRESUPUESTO TOTAL" total={total} />
        </div>
      </div>
    </div>
  );
}
