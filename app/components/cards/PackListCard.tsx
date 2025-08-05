import { ChevronDown, ChevronUp, Trash2, Ellipsis } from "lucide-react";
import { nanoid } from "nanoid";
import type React from "react";
import { useEffect, useState, useRef } from "react";

type PackingItem = {
  id: string; // ID interno para React keys
  item_id: string; // ID único para backend con nanoid
  text: string;
  packed: boolean;
};

interface PackListCardProps {
  listId?: string;
  title?: string;
  onDelete?: () => void;
}

const PackListCard: React.FC<PackListCardProps> = ({ 
  listId = "default", 
  title = "Lista de equipaje",
  onDelete 
}) => {
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Load from localStorage with unique key per list
  useEffect(() => {
    const saved = localStorage.getItem(`packingList-${listId}`);
    if (saved) {
      setPackingList(JSON.parse(saved));
    }
  }, [listId]);

  // Save to localStorage with unique key per list
  useEffect(() => {
    localStorage.setItem(`packingList-${listId}`, JSON.stringify(packingList));
  }, [packingList, listId]);

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

  const addItem = () => {
    if (newItem.trim()) {
      const item: PackingItem = {
        id: nanoid(), // ID interno para React
        item_id: nanoid(), // ID único para backend
        text: newItem.trim(),
        packed: false,
      };
      setPackingList([...packingList, item]);
      setNewItem("");
      
      // Simulación de petición al backend
      console.log("🆕 CREATE ITEM - Backend Request:", {
        action: "create_item",
        list_id: listId,
        item_id: item.item_id,
        text: item.text,
        packed: item.packed
      });
    }
  };

  const togglePacked = (id: string) => {
    setPackingList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, packed: !item.packed };
          
          // Simulación de petición al backend
          console.log("✅ UPDATE ITEM - Backend Request:", {
            action: "update_item",
            list_id: listId,
            item_id: item.item_id,
            packed: updatedItem.packed,
            text: item.text
          });
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    // Encontrar el item antes de eliminarlo para obtener el item_id
    const itemToDelete = packingList.find(item => item.id === id);
    
    if (itemToDelete) {
      // Simulación de petición al backend
      console.log("🗑️ DELETE ITEM - Backend Request:", {
        action: "delete_item",
        list_id: listId,
        item_id: itemToDelete.item_id,
        text: itemToDelete.text
      });
    }
    
    setPackingList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`w-full bg-light-primary rounded-2xl shadow-lg p-4 relative flex flex-col transition-all duration-300`}
    >
      <div
        className={`flex items-start justify-between cursor-pointer ${onDelete ? "pr-20" : "pr-12"} ${isExpanded ? "mb-4" : "mb-1"}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          {isExpanded ? (
            <>
              <div className="text-gray-600 text-sm mb-1">
                {title}
              </div>
              <div className="text-[1.35rem] font-semibold text-black mb-2">
                {packingList.length > 0
                  ? `${packingList.filter((item) => item.packed).length}/${packingList.length} Items`
                  : "Lista vacía"}
              </div>
              <div className="text-gray-400 text-sm mb-4">
                {packingList.length > 0
                  ? "Organiza tu equipaje"
                  : "Añade elementos a tu lista"}
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-700">{title}</div>
          )}
        </div>
        
        {/* Menú de opciones con 3 puntos (solo si hay función onDelete) */}
        {onDelete && (
          <div className="absolute top-4 right-12" ref={optionsRef}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita expandir/colapsar la lista
                setShowOptions((prev) => !prev);
              }}
              type="button"
              className="p-2 hover:bg-light-secondary-100 rounded-lg transition-colors"
            >
              <Ellipsis className="w-5 h-5 text-gray-600" />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-32 bg-light-primary border rounded-lg shadow-md z-10">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-light-secondary-100"
                  onClick={() => {
                    onDelete();
                    setShowOptions(false);
                  }}
                  type="button"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Botón de expandir/colapsar */}
        <button
          aria-label={isExpanded ? "Colapsar equipaje" : "Expandir equipaje"}
          className="absolute top-4 right-4 p-2 hover:bg-light-secondary-100 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {/* Añadir ítem */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Nuevo elemento</label>
            <input
              className="border border-gray-300 rounded-md p-2 text-xs w-full focus:outline-none focus:border-green-500 focus:ring-0 "
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addItem();
              }}
              placeholder="Añadir ítem al equipaje..."
              type="text"
              value={newItem}
            />
          </div>

          {/* Botón añadir */}
          <button
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-xs hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!newItem.trim()}
            onClick={addItem}
            type="button"
          >
            Añadir elemento
          </button>

          {/* Lista de ítems */}
          <div>
            {packingList.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p className="text-xs">No hay elementos en tu lista</p>
                <p className="text-xs">¡Añade algunos para empezar!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {packingList.map((item) => (
                  <div
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    key={item.id}
                    onClick={() => togglePacked(item.id)}
                  >
                    <div className="flex items-center gap-2 flex-1 pointer-events-none min-w-0">
                      <input
                        checked={item.packed}
                        className="w-3 h-3 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-1 flex-shrink-0"
                        readOnly
                        type="checkbox"
                      />
                      <span
                        className={`text-xs transition-all duration-300 truncate ${
                          item.packed
                            ? "line-through text-gray-500 opacity-75"
                            : "text-gray-700"
                        }`}
                        title={item.text}
                      >
                        {item.text}
                      </span>
                    </div>
                    <button
                      aria-label="Eliminar"
                      className="text-red-400 hover:text-red-600 p-1 rounded transition-colors text-xs pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      type="button"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackListCard;
