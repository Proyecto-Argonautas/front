import { ChevronDown, ChevronUp } from "lucide-react";
import { nanoid } from "nanoid";
import type React from "react";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

type WeatherData = {
  temp: number;
  resume: string;
  icon: string;
  main: string;
};

type PackingItem = {
  id: string;
  text: string;
  packed: boolean;
};

const PackListCard: React.FC = () => {
  const [destination, setDestination] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Load from localStorage with unique key
  useEffect(() => {
    const saved = localStorage.getItem("packingList");
    if (saved) {
      setPackingList(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage with unique key
  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(packingList));
  }, [packingList]);

  const fetchWeather = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${destination.trim()}&units=metric&appid=${API_KEY}&lang=es`,
      );
      const data = await res.json();
      if (data.cod === 200) {
        const weatherInfo: WeatherData = {
          temp: data.main.temp,
          resume: data.weather[0].resume,
          icon: data.weather[0].icon,
          main: data.weather[0].main,
        };
        setWeather(weatherInfo);
        suggestItems(weatherInfo.main);
      } else {
        setError(`Clima no disponible para "${destination}"`);
      }
    } catch (error) {
      console.error("Error al obtener el clima:", error);
      setError("Error al obtener el clima");
    } finally {
      setLoading(false);
    }
  };

  const suggestItems = (condition: string) => {
    const suggestionsMap: Record<string, string[]> = {
      Rain: ["Paraguas", "Impermeable"],
      Snow: ["Guantes", "Botas de nieve"],
      Clear: ["Gafas de sol", "Protector solar"],
      Clouds: ["Chaqueta ligera"],
      Thunderstorm: ["Ropa impermeable", "Zapatos cerrados"],
    };

    const suggestions = suggestionsMap[condition] || [];
    const existing = packingList.map((item) => item.text.toLowerCase());

    const newSuggestions = suggestions
      .filter((text) => !existing.includes(text.toLowerCase()))
      .map((text) => ({ id: nanoid(), text, packed: false }));

    setPackingList((prev) => [...prev, ...newSuggestions]);
  };

  const addItem = () => {
    if (newItem.trim()) {
      const item: PackingItem = {
        id: nanoid(),
        text: newItem.trim(),
        packed: false,
      };
      setPackingList([...packingList, item]);
      setNewItem("");
    }
  };

  const togglePacked = (id: string) => {
    setPackingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setPackingList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg w-full h-fit ${isExpanded ? 'p-4 sm:p-6' : 'p-4'}`}>
      <div className="relative">
        <h2 className={`text-center text-gray-800 pr-12 ${isExpanded ? 'text-xl sm:text-2xl font-bold mb-4 sm:mb-6' : 'text-lg font-semibold text-gray-700 mb-1'}`}>
          {isExpanded ? "🧳 Planificador de Equipaje" : "Equipaje"}
        </h2>
        
        <button
          aria-label={
            isExpanded ? "Colapsar planificador" : "Expandir planificador"
          }
          className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 sm:space-y-6">
          {/* Sección de destino y clima */}
          <div className="w-full">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center gap-2">
                🌤️ Información del Clima
              </h3>

              {/* Buscar destino */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Buscar destino (ej. Madrid)"
                  type="text"
                  value={destination}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                  disabled={loading}
                  onClick={fetchWeather}
                  type="button"
                >
                  {loading ? "🔍" : "Buscar"}
                </button>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              {/* Mostrar información del clima */}
              {weather ? (
                <div className="bg-white rounded-lg p-4 text-center border border-blue-200 shadow-sm">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">
                    📍 {destination}
                  </h4>
                  <div className="flex items-center justify-center mb-3">
                    <img
                      alt="icono clima"
                      className="w-16 h-16"
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-800">
                      {Math.round(weather.temp)}°C
                    </p>
                    <p className="capitalize text-gray-600 text-sm">
                      {weather.resume}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p className="text-sm">🌍 Busca un destino</p>
                  <p className="text-xs">para obtener recomendaciones de equipaje</p>
                </div>
              )}
            </div>
          </div>

          {/* Sección de lista de equipaje */}
          <div className="w-full">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
                📝 Lista de Equipaje
              </h3>

              {/* Añadir ítem */}
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  className="flex-1 px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addItem();
                  }}
                  placeholder="Añadir ítem al equipaje..."
                  type="text"
                  value={newItem}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-sm min-w-[80px]"
                  onClick={addItem}
                  type="button"
                >
                  Añadir
                </button>
              </div>

              {/* Lista de ítems */}
              <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
                {packingList.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-sm">No hay ítems en tu lista</p>
                    <p className="text-xs">¡Añade algunos elementos para empezar!</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {packingList.map((item) => (
                      <li
                        className="flex items-center justify-between p-3 border border-green-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                        key={item.id}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                            checked={item.packed}
                            onChange={() => togglePacked(item.id)}
                            type="checkbox"
                          />
                          <span
                            className={`transition-all duration-200 ${
                              item.packed 
                                ? "line-through text-gray-500 opacity-75" 
                                : "text-gray-700"
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                        <button
                          aria-label="Eliminar"
                          className="text-red-400 hover:text-red-600 p-1 rounded transition-colors duration-200 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                          type="button"
                        >
                          🗑️
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackListCard;
