import {
  BedDouble,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HotelArticleTest() {
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Cerrar menú si se hace clic fuera
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

  if (!visible) return null; // Oculta el artículo si se elimina

  return (
    <article className="relative w-full max-w-md mx-auto mt-5 bg-white rounded-2xl shadow-md">
      <button
        aria-controls="article-details"
        aria-expanded={open}
        className="flex items-center justify-between w-full p-4 cursor-pointer bg-transparent border-0 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-2 mr-auto">
          <BedDouble />
          <h2 className="flex gap-2 text-lg font-semibold min-w-10">Hotels</h2>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>

        <div className="relative" ref={optionsRef}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita abrir/cerrar el acordeón
              setShowOptions((prev) => !prev);
            }}
            type="button"
          >
            <Ellipsis />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-20">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => setVisible(false)}
                type="button"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </button>

      {open && (
        <div className="border-t px-4 py-4 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <div className="font-semibold">San Francisco Hotel</div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="text-gray-600">Lun., 14 jul.</div>
            <div className="text-gray-600">Vie., 18 jul.</div>
          </div>

          <div className="text-gray-500 text-xs uppercase tracking-wide">
            AVENIDA SAN FRANCISCO 22 05040
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <div className="text-xs text-gray-400 uppercase">
                Número de confirmación
              </div>
              <div className="font-mono text-sm">4131314</div>
            </div>
            <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
              780,00 US$
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
