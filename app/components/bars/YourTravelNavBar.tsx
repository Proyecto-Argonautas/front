import React, { useState } from 'react';
import { FaDollarSign, FaBars } from 'react-icons/fa';

const tabs = ['Descripción', 'Itinerario', 'Explorar'];

const YourTravelNavBar = () => {
  const [activeTab, setActiveTab] = useState('Descripción');

  return (
    <div className="flex items-center justify-between bg-white shadow-sm px-4">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 font-semibold text-sm transition-all duration-200 ${
              activeTab === tab
                ? 'text-emerald-400 border-b-2 border-emerald-400'
                : 'text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4 text-gray-700 text-lg">
        
        <FaBars />
      </div>
    </div>
  );
};

export default YourTravelNavBar;