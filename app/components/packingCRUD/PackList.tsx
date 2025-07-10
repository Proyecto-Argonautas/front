import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

type WeatherData = {
  temp: number;
  description: string;
  icon: string;
  main: string;
};

type PackingItem = {
  id: string;
  text: string;
  packed: boolean;
};

const PackList: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('packingList');
    if (saved) {
      setPackingList(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('packingList', JSON.stringify(packingList));
  }, [packingList]);

  const fetchWeather = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${destination.trim()}&units=metric&appid=${API_KEY}&lang=es`
      );
      const data = await res.json();
      console.log(data); // para ver la respuesta de la API
      if (data.cod === 200) {
        const weatherInfo: WeatherData = {
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          main: data.weather[0].main,
        };
        setWeather(weatherInfo);
        suggestItems(weatherInfo.main);
      } else {
        setError(`Clima no disponible para "${destination}"`);
      }
    } catch (error) {
      setError('Error al obtener el clima');
    } finally {
      setLoading(false);
    }
  };

  const suggestItems = (condition: string) => {
    const suggestionsMap: Record<string, string[]> = {
      Rain: ['Paraguas', 'Impermeable'],
      Snow: ['Guantes', 'Botas de nieve'],
      Clear: ['Gafas de sol', 'Protector solar'],
      Clouds: ['Chaqueta ligera'],
      Thunderstorm: ['Ropa impermeable', 'Zapatos cerrados'],
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
      setNewItem('');
    }
  };

  const togglePacked = (id: string) => {
    setPackingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setPackingList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4  font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">🌍 Planificador de Equipaje</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Destino (ej. Madrid)"
          className="flex-1 px-4 py-2 border rounded"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar clima'}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {weather && (
        <div className="bg-blue-100 rounded p-4 mb-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Clima en {destination}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="icono clima"
            className="mx-auto"
          />
          <p className="capitalize">{weather.description} - {weather.temp}°C</p>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">🧳 Lista de Equipaje</h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Añadir ítem..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addItem(); }}
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Añadir
          </button>
        </div>

        <ul className="space-y-2">
          {packingList.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => togglePacked(item.id)}
                />
                <span className={item.packed ? 'line-through text-gray-500' : ''}>
                  {item.text}
                </span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackList;
