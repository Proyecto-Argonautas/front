import React from "react";
import { Search, Plus, UserRound } from "lucide-react";

const MainMenuBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
      
      <button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
        <Search className="w-6 h-6" />
      </button>
      
      <button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
        <Plus className="w-6 h-6" />
      </button>

      <button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
        <UserRound className="w-6 h-6" />
      </button>
      
    </div>
  );
};

export default MainMenuBar;