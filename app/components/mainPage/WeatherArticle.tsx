import {
  ChevronDown,
  ChevronUp,
  Cloud,
  Ellipsis,
  Trash2,
  Save,
} from "lucide-react";
import { useEffect, useRef, useState, useContext } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { nanoid } from "nanoid";
import { UserContext } from "~/contexts/UserContext";
import { useTravel } from "~/contexts/TravelContext";

// Esquema de validación con Zod v4
const weatherFormSchema = z.object({
  city: z.string().min(1, "La ciudad es requerida").max(100, "Máximo 100 caracteres"),
});

type WeatherFormData = z.infer<typeof weatherFormSchema>;
type FormErrors = Partial<Record<keyof WeatherFormData, string>>;

export default function WeatherArticle() {
  // Contextos
  const user = useContext(UserContext);
  const { travelData } = useTravel();
  
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<WeatherFormData>({
    city: "",
  });
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Log cuando se crea el artículo
  useEffect(() => {
    console.log("Artículo creado:", {
      user_id: user?.id || "unknown",
      travel_id: travelData?.destiny || "unknown",
      component_type: "weather"
    });
  }, [user?.id, travelData?.destiny]);

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: keyof WeatherFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Validar campo individual
    try {
      weatherFormSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  // Función para obtener el clima
  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric&lang=es`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        // Datos de ejemplo para demo
        setWeatherData({
          name: city,
          main: { temp: 22, feels_like: 24, humidity: 65 },
          weather: [{ main: "Clear", description: "cielo claro", icon: "01d" }],
          wind: { speed: 3.5 }
        });
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Datos de ejemplo para demo
      setWeatherData({
        name: city,
        main: { temp: 22, feels_like: 24, humidity: 65 },
        weather: [{ main: "Clear", description: "cielo claro", icon: "01d" }],
        wind: { speed: 3.5 }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const validatedData = weatherFormSchema.parse(formData);
      const submissionData = {
        ...validatedData,
        component_id: nanoid(),
        component_type: "weather",
      };
      
      console.log("Datos del formulario de clima:", submissionData);
      fetchWeather(validatedData.city);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof WeatherFormData] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    try {
      weatherFormSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
  };

  // Función para eliminar el artículo completo
  const handleDeleteArticle = () => {
    console.log("Artículo eliminado:", {
      user_id: user?.id || "unknown",
      travel_id: travelData?.destiny || "unknown",
      component_type: "weather"
    });
    setVisible(false);
  };

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

  if (!visible) return null;

  return (
    <article className="relative w-full mt-2 bg-light-primary rounded-2xl shadow-md">
      <div className="relative">
        <button
          aria-controls="article-details"
          aria-expanded={open}
          className="flex items-center justify-between w-full p-4 cursor-pointer bg-transparent border-0 rounded-t-2xl outline-none"
          onClick={() => setOpen(!open)}
          type="button"
        >
          <div className="flex items-center gap-2 mr-auto">
            <Cloud />
            <h2 className="flex gap-2 text-lg font-semibold min-w-10">Clima</h2>
            {open ? <ChevronUp /> : <ChevronDown />}
          </div>
        </button>

        <div className="absolute top-4 right-4" ref={optionsRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowOptions((prev) => !prev);
            }}
            type="button"
          >
            <Ellipsis />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-light-primary border rounded-lg shadow-md z-10">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-light-secondary-100"
                onClick={handleDeleteArticle}
                type="button"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t px-4 py-4 space-y-4 text-sm text-gray-700">
          {!weatherData ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de ciudad */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ingresa el nombre de la ciudad"
                />
                {errors.city && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.city}</span>
                )}
              </div>

              {/* Botón de buscar */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid() || isLoading}
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-base font-medium transition-colors w-full max-w-xs"
                >
                  <Save size={18} />
                  {isLoading ? "Buscando..." : "Buscar Clima"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Información del clima */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {weatherData.name}
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <p className="text-gray-600 capitalize mb-4">
                  {weatherData.weather[0].description}
                </p>
              </div>

              {/* Detalles del clima */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-light-secondary-100 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-500">Sensación térmica</div>
                  <div className="text-lg font-semibold">{Math.round(weatherData.main.feels_like)}°C</div>
                </div>
                <div className="bg-light-secondary-100 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-500">Humedad</div>
                  <div className="text-lg font-semibold">{weatherData.main.humidity}%</div>
                </div>
                <div className="bg-light-secondary-100 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-500">Viento</div>
                  <div className="text-lg font-semibold">{weatherData.wind.speed} m/s</div>
                </div>
                <div className="bg-light-secondary-100 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-500">Estado</div>
                  <div className="text-lg font-semibold">{weatherData.weather[0].main}</div>
                </div>
              </div>

              {/* Botón para buscar otra ciudad */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setWeatherData(null);
                    setFormData({ city: "" });
                    setIsEditing(true);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Buscar otra ciudad
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
