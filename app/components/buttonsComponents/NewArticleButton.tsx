import { BedDouble, DollarSign, NotebookPen, PlaneTakeoff } from "lucide-react";
import { useState } from "react";
import CurrencyArticle from "../mainPage/CurrencyArticle";
import FlightArticle from "../mainPage/FlightsArticle";
import HotelArticleTest from "../mainPage/HotelArticle";
import NotesArticle from "../mainPage/NotesArticle";

type SectionType = "note" | "flight" | "hotel" | "currency";

interface Section {
  id: number;
  type: SectionType;
}

interface NewArticleButtonProps {
  defaultNotesArticle?: boolean;
}

export default function NewArticleButton({
  defaultNotesArticle = false,
}: NewArticleButtonProps) {
  const [sections, setSections] = useState<Section[]>(() => {
    return defaultNotesArticle ? [{ id: 0, type: "note" }] : [];
  });
  const [showMenu, setShowMenu] = useState(false);

  const addSection = (type: SectionType) => {
    setSections((prev) => [...prev, { id: Date.now(), type }]);
    setShowMenu(false);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {sections.map((section, index) => (
          <div className="w-full" key={section.id}>
            {section.type === "note" && (
              <NotesArticle
                alignment="left"
                defaultOpen={defaultNotesArticle && index === 0}
              />
            )}
            {section.type === "flight" && <FlightArticle />}
            {section.type === "hotel" && <HotelArticleTest />}
            {section.type === "currency" && <CurrencyArticle />}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md">
        <button
          className="w-full mt-3 py-2 px-4 bg-cold-light-400 hover:bg-cold-light-700 text-white rounded-2xl shadow font-semibold transition"
          onClick={() => setShowMenu((prev) => !prev)}
          type="button"
        >
          + Añadir nueva sección
        </button>

        {showMenu && (
          <div className="absolute z-10 w-full bg-light-primary p-3 mt-2 rounded-2xl shadow-lg flex flex-col md:flex-row md:overflow-hidden">
            <button
              className="flex gap-1 w-full text-left px-4 py-2 hover:bg-light-secondary-100 text-sm"
              onClick={() => addSection("note")}
              type="button"
            >
              <NotebookPen /> Nota
            </button>
            <button
              className="flex gap-1 w-full text-left px-4 py-2 hover:bg-light-secondary-100 text-sm"
              onClick={() => addSection("flight")}
              type="button"
            >
              <PlaneTakeoff /> Vuelo
            </button>
            <button
              className="flex gap-1 w-full text-left px-4 py-2 hover:bg-light-secondary-100 text-sm"
              onClick={() => addSection("hotel")}
              type="button"
            >
              <BedDouble /> Hotel
            </button>
            <button
              className="flex gap-1 w-full text-left px-4 py-2 hover:bg-light-secondary-100 text-sm"
              onClick={() => addSection("currency")}
              type="button"
            >
              <DollarSign /> Moneda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
