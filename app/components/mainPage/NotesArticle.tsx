import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  NotebookPen,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function NotesArticle() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!visible) return null; // No renderizar si está "eliminado"

  return (
    <article className="relative w-full max-w-md mx-auto mt-5 bg-white rounded-2xl shadow-md">
      <button
        aria-controls="notes-article-content"
        aria-expanded={open}
        className="flex items-center w-full p-4 cursor-pointer bg-transparent border-0 outline-none"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-2 mr-auto">
          <NotebookPen />
          <h2 className="flex gap-2 text-lg font-semibold min-w-10">Notes </h2>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <div className="absolute top-4 right-4" ref={optionsRef}>
        <button
          className="p-1"
          onClick={() => setShowOptions((prev) => !prev)}
          type="button"
        >
          <Ellipsis />
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
            <button
              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => setVisible(false)}
              type="button"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {open && (
        <div className="border-t px-4 py-4" id="notes-article-content">
          <textarea
            className="w-full h-32 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escribe tus notas aquí..."
            value={note}
          />
        </div>
      )}
    </article>
  );
}
