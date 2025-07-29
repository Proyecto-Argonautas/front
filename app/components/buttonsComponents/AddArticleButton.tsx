import {
  BedDouble,
  DollarSign,
  NotebookPen,
  PlaneTakeoff,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useSections } from "~/contexts/SectionsContext";

const AddArticleButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { addSection } = useSections();

  const handleAddSection = (type: "note" | "flight" | "hotel" | "currency") => {
    addSection(type);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8 hover:bg-emerald-700 transition"
        onClick={() => setShowMenu((prev) => !prev)}
        type="button"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showMenu && (
        <div className="absolute z-10 w-40 md:w-[500px] lg:w-[600px] bg-white p-3 mb-8 bottom-full left-1/2 transform -translate-x-1/2 rounded-2xl shadow-lg flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <button
            className="flex gap-1 w-full text-center md:text-left justify-center md:justify-start px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("note")}
            type="button"
          >
            <NotebookPen /> Nota
          </button>
          <button
            className="flex gap-1 w-full text-center md:text-left justify-center md:justify-start px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("flight")}
            type="button"
          >
            <PlaneTakeoff /> Vuelo
          </button>
          <button
            className="flex gap-1 w-full text-center md:text-left justify-center md:justify-start px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("hotel")}
            type="button"
          >
            <BedDouble /> Hotel
          </button>
          <button
            className="flex gap-1 w-full text-center md:text-left justify-center md:justify-start px-4 py-2 hover:bg-gray-100 text-sm whitespace-nowrap rounded-lg"
            onClick={() => handleAddSection("currency")}
            type="button"
          >
            <DollarSign /> Moneda
          </button>
        </div>
      )}
    </div>
  );
};

export default AddArticleButton;
