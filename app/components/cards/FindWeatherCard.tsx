import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

type WeatherData = {
  temp: number;
  resume: string;
  icon: string;
  main: string;
};

const FindWeatherCard: React.FC = () => {
  const [destination, setDestination] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

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

  return (
    <div
      className={`w-full bg-light-primary rounded-2xl shadow-lg p-4 relative flex flex-col transition-all duration-300 ${isExpanded ? "h-[410px]" : "h-auto"}`}
    >
      <div
        className={`flex items-start justify-between cursor-pointer pr-12 ${isExpanded ? "mb-4" : "mb-1"}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          {isExpanded ? (
            <>
              <div className="text-gray-600 text-sm mb-1">
                Información del clima
              </div>
              <div className="text-[1.35rem] font-semibold text-black mb-2">
                {weather
                  ? `${destination} - ${Math.round(weather.temp)}°C`
                  : "Buscar destino"}
              </div>
              <div className="text-gray-400 text-sm mb-4">
                {weather
                  ? weather.resume
                  : "Consulta el clima de cualquier ciudad"}
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-700">Clima</div>
          )}
        </div>
        <button
          aria-label={isExpanded ? "Colapsar clima" : "Expandir clima"}
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
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Buscar destino */}
          <div className="flex flex-col flex-shrink-0">
            <label className="text-xs text-gray-500 mb-2">Destino</label>
            <input
              className="border border-gray-300 rounded-md p-2 text-xs w-full focus:outline-none focus:border-green-500 focus:ring-0 "
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchWeather();
              }}
              placeholder="Buscar destino (ej. Madrid)"
              type="text"
              value={destination}
            />
          </div>

          {/* Botón de búsqueda */}
          <button
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md text-xs hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            disabled={loading || !destination.trim()}
            onClick={fetchWeather}
            type="button"
          >
            {loading ? "Buscando..." : "Buscar clima"}
          </button>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex-shrink-0">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto">
            {/* Mostrar información del clima */}
            {weather && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <img
                      alt="icono clima"
                      className="w-12 h-12"
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-800">
                      {Math.round(weather.temp)}°C
                    </p>
                    <p className="capitalize text-gray-600 text-xs">
                      {weather.resume}
                    </p>
                    <p className="text-xs text-gray-500">📍 {destination}</p>
                  </div>
                </div>
              </div>
            )}

            {!weather && !loading && !error && (
              <div className="text-center py-4 text-gray-500">
                <p className="text-xs">🌍 Busca un destino para ver el clima</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindWeatherCard;
