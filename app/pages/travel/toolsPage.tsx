import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { redirect } from "react-router";
import PackListCard from "~/components/cards/PackListCard";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [
    { title: "Travels - Equipaje" },
    { name: "equipaje", content: "Lista de equipaje" },
  ];
}


export async function clientLoader() {

  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }
}

export const handle: handlePages = {
  buttons: ["home", "profile"],
};

// Tipo para las listas de equipaje
interface PackList {
  id: string;
  title: string;
}

export default function ToolPage() {
  const [packLists, setPackLists] = useState<PackList[]>([
    { id: nanoid(), title: "Lista principal" },
  ]);

  // Función para añadir una nueva lista
  const handleAddNewList = () => {
    const newList: PackList = {
      id: nanoid(),
      title: `Lista ${packLists.length + 1}`,
    };
    setPackLists((prev) => [...prev, newList]);
  };

  // Función para eliminar una lista
  const handleDeleteList = (listId: string) => {
    if (packLists.length > 1) {
      // Mantener al menos una lista
      setPackLists((prev) => prev.filter((list) => list.id !== listId));
    }
  };
  return (
    <div className="py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
             Lista de equipaje 🧳
          </h1>
        </div>

        <div className="space-y-6">
          {/* Renderizar todas las listas de equipaje */}
          {packLists.map((packList) => (
            <div className="flex justify-center" key={packList.id}>
              <PackListCard
                key={packList.id}
                listId={packList.id}
                onDelete={
                  packLists.length > 1
                    ? () => handleDeleteList(packList.id)
                    : undefined
                }
                title={packList.title}
              />
            </div>
          ))}

          {/* Botón para añadir nueva lista */}
          <div className="flex justify-center">
            <button
              className="flex items-center justify-center gap-2 w-full max-w-md py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              onClick={handleAddNewList}
              type="button"
            >
              <Plus size={20} />
              Crear nueva lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
