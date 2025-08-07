import { type LoaderFunctionArgs, redirect } from "react-router";
import SectionsRenderer from "~/components/sections/SectionsRenderer";
import { useMenu } from "~/contexts/MenuContext";
import { useSections } from "~/contexts/SectionsContext";
import { getTravels } from "~/services/getTravel";
import { getUserAsync, isUserAuthenticated } from "~/services/getUser";
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


export async function clientLoader({ params }: LoaderFunctionArgs) {
  const travelId = params.travelId;

  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }

  const user = await getUserAsync(); // Fetch the user
  const userId = user?.id; // Get the user ID
  const travels = await getTravels(userId); // Fetch travels using the user ID\

  const travelExists = travels?.some(
    (travel) => travel.id === travelId,
  );

  if (!travelExists) {
    return redirect("/"); // Redirect to root if no travels exist
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
