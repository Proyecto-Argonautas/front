import PackListCard from "~/components/cards/PackListCard";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [
    { title: "Travels - Equipaje" },
    { name: "equipaje", content: "Lista de equipaje" },
  ];
}

export const handle: handlePages = {
  buttons: ["home", "profile"],
};

export default function ToolPage() {
  return (
    <div className="min-h-screen py-4 sm:py-6 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          🧳 Lista de equipaje
          </h1>
        </div>

        <div className="flex justify-center">
          <PackListCard key="pack-list" />
        </div>
      </div>
    </div>
  );
}
