import {
  BedDouble,
  CloudSun,
  DollarSign,
  Languages,
  NotebookPen,
  PiggyBank,
  PlaneTakeoff,
  Plus,
} from "lucide-react";
import { useContext, useState } from "react";
import { useMenu } from "~/contexts/MenuContext";
import { useSections } from "~/contexts/SectionsContext";
import { useTravel } from "~/contexts/TravelContext";
import { UserContext } from "~/contexts/UserContext";

const AddArticleButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { addSection } = useSections();
  const { setIsAddArticleMenuOpen } = useMenu();
  const { travelData } = useTravel();
  const user = useContext(UserContext);

  const toggleMenu = (newState: boolean) => {
    setShowMenu(newState);
    setIsAddArticleMenuOpen(newState);
  };

  const handleAddSection = (
    type: "note" | "flight" | "hotel" | "currency" | "weather" | "translate" | "budget",
  ) => {
    console.log("Nuevo artículo creado:", {
      component_type: type,
      travel_id: travelData?.destiny || "No travel ID",
      user_id: user?.id || "No user ID",
    });

    addSection(type);
    toggleMenu(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-cold-light-400 text-white rounded-full p-4 shadow-lg -mt-8 hover:bg-cold-light-700 transition"
        onClick={() => toggleMenu(!showMenu)}
        type="button"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showMenu && (
        <div className="absolute z-10 w-40 bg-light-primary border border-gray-200 p-3 mb-8 bottom-full left-1/2 transform -translate-x-1/2 rounded-2xl shadow-lg flex flex-col space-y-2">
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("note")}
            type="button"
          >
            <NotebookPen className="w-4 h-4" /> Nota
          </button>
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("flight")}
            type="button"
          >
            <PlaneTakeoff className="w-4 h-4" /> Vuelos
          </button>
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("hotel")}
            type="button"
          >
            <BedDouble className="w-4 h-4" /> Alojamientos
          </button>
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("currency")}
            type="button"
          >
            <DollarSign className="w-4 h-4" /> Divisa
          </button>
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("weather")}
            type="button"
          >
            <CloudSun className="w-4 h-4" /> Clima
          </button>
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("translate")}
            type="button"
          >
            <Languages className="w-4 h-4" /> Traductor
          </button>
          <button
            className="flex items-center gap-2 w-full justify-start px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("budget")}
            type="button"
          >
            <PiggyBank className="w-4 h-4" /> Presupuesto
          </button>
        </div>
      )}
    </div>
  );
};

export default AddArticleButton;