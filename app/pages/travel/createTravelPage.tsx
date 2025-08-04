import StartPlanning from "~/components/buttonsComponents/StartPlanningButton";
import TravelForm, { type TravelFormData } from "~/components/forms/TravelForm";
import type { handlePages } from "~/types/navigationButtons";
import { useTravel } from "~/contexts/TravelContext";

export function meta() {
  return [
    { title: "Travels - Main Form" },
    { name: "resume", content: "Form create travels" },
  ];
}

export const handle: handlePages = {
  hideHeader: true,
  buttons: ["home", "profile"],
};

export default function CreateTravelPage() {
  const { updateTravelData } = useTravel();

  const handleTravelFormSubmit = (data: TravelFormData) => {
    console.log("Travel form data:", data);
    updateTravelData(data);
    // Aquí puedes manejar los datos del formulario (ej: navegar a otra página)
  };

  return (
    <div className="flex flex-col gap-2 min-h-screen p-3 sm:p-4 pb-16">
      <div className="max-w-3xl mx-auto bg-light-primary shadow-md rounded-lg p-3 sm:p-4 w-full">
        <TravelForm onSubmit={handleTravelFormSubmit} />
      </div>

      <div className="max-w-3xl mx-auto w-full mb-16 mt-3 sm:mt-0">
        <StartPlanning />
      </div>
    </div>
  );
}
