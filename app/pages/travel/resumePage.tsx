import { redirect } from "react-router";
import SectionsRenderer from "~/components/sections/SectionsRenderer";
import { useMenu } from "~/contexts/MenuContext";
import { useSections } from "~/contexts/SectionsContext";
import { isUserAuthenticated } from "~/services/getUser";
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


export async function clientLoader() {
  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }
}

export default function ResumePage() {
  const { sections } = useSections();
  const { isAddArticleMenuOpen } = useMenu();



  return (
    <div className="p-4 space-y-4 relative">
      <div className={`space-y-6 transition-all duration-200 ${isAddArticleMenuOpen ? 'blur-sm' : ''}`}>
        {/* Mensaje cuando no hay secciones */}
        {sections.length === 0 && (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Añade tu primera sección
            </h2>
            <p className="text-gray-500">
              Usa el botón + para comenzar a personalizar tu viaje
            </p>
          </div>
        )}

        {/* Área principal - Secciones */}
        <div>
          <SectionsRenderer />
        </div>
      </div>
    </div>
  );
}
