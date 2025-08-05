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
      <div className="space-y-6">
        {/* Área principal - Secciones */}
        <div>
          <SectionsRenderer />
          
        </div>

        {/* Presupuesto */}
        <div>
          <WidgetBudget currency="€" title="PRESUPUESTO TOTAL" total={total} />
        </div>
      </div>
    </div>
  );
}
