import React from "react";
import { Search, Plus, User } from "lucide-react";

const MainMenuBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
      {/* Botón de Inicio */}
      <button className="flex flex-col items-center text-black">
        <Search className="w-6 h-6" />
      </button>

      {/* Botón central de agregar */}
      <button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
        <Plus className="w-6 h-6" />
      </button>

      {/* Botón de perfil */}
      <button className="flex flex-col items-center text-gray-400">
        <User className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MainMenuBar;