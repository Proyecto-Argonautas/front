// components/NewArticleButton.tsx
import { BedDouble, NotebookPen, PlaneTakeoff } from "lucide-react";
import { useState } from "react";
import FlightArticle from "~/components/mainPage/Flightsarticle";
import HotelArticle from "~/components/mainPage/HotelArticle";
import NotesArticle from "~/components/mainPage/notesArticle";

type SectionType = "note" | "flight" | "hotel";

interface Section {
  id: number;
  type: SectionType;
}

export default function NewArticleButton() {
  const [sections, setSections] = useState<Section[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const addSection = (type: SectionType) => {
    setSections((prev) => [...prev, { id: Date.now(), type }]);
    setShowMenu(false);
  };

  return (
    <div className="mt-5 mb-10 w-full max-w-md mx-auto space-y-4">
      {sections.map((section) => (
        <div key={section.id}>
          {section.type === "note" && <NotesArticle />}
          {section.type === "flight" && <FlightArticle />}
          {section.type === "hotel" && <HotelArticle />}
        </div>
      ))}

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="w-full py-2 px-4 bg-emerald-400 hover:bg-emerald-700 text-white rounded-2xl shadow font-semibold transition"
        >
          + Nueva sección
        </button>

        {showMenu && (
          <div className=" flex absolute z-10 mt-2 w-full bg-white  rounded-xl shadow-lg overflow-hidden">
            <button
              type="button"
              onClick={() => addSection("note")}
              className="flex  gap-1 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              <NotebookPen /> Añadir nota
            </button>
            <button
              type="button"
              onClick={() => addSection("flight")}
              className="flex gap-1 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              <PlaneTakeoff /> Añadir vuelo
            </button>
            <button
              type="button"
              onClick={() => addSection("hotel")}
              className="flex gap-1 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              <BedDouble /> Añadir hotel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
