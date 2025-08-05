import {
  BedDouble,
  DollarSign,
  NotebookPen,
  PlaneTakeoff,
  Plus,
  Cloud,
  Languages,
} from "lucide-react";
import { useState } from "react";
import { useSections } from "~/contexts/SectionsContext";
import { nanoid } from "nanoid";

const AddArticleButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { addSection } = useSections();

  const handleAddSection = (type: "note" | "flight" | "hotel" | "currency" | "weather" | "translate") => {
    const component_id = nanoid();
    const component_type = type;
    
    console.log("Nuevo artículo creado:", {
      component_type,
      component_id
    });
    
    addSection(type);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-cold-light-400 text-white rounded-full p-4 shadow-lg -mt-8 hover:bg-cold-light-700 transition"
        onClick={() => setShowMenu((prev) => !prev)}
        type="button"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showMenu && (
        <div className="absolute z-10 w-40 bg-light-primary p-3 mb-8 bottom-full left-1/2 transform -translate-x-1/2 rounded-2xl shadow-lg flex flex-col space-y-2">
          <button
            className="flex gap-1 w-full text-center justify-center px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("note")}
            type="button"
          >
            <NotebookPen /> Nota
          </button>
          <button
            className="flex gap-1 w-full text-center justify-center px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("flight")}
            type="button"
          >
            <PlaneTakeoff /> Vuelo
          </button>
          <button
            className="flex gap-1 w-full text-center justify-center px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("hotel")}
            type="button"
          >
            <BedDouble /> Hotel
          </button>
          <button
            className="flex gap-1 w-full text-center justify-center px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("currency")}
            type="button"
          >
            <DollarSign /> Moneda
          </button>
          <button
            className="flex gap-1 w-full text-center justify-center px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("weather")}
            type="button"
          >
            <Cloud /> Clima
          </button>
          <button
            className="flex gap-1 w-full text-center justify-center px-4 py-2 hover:bg-light-secondary-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("translate")}
            type="button"
          >
            <Languages /> Traductor
          </button>
        </div>
      )}
    </div>
  );
};

export default AddArticleButton;
