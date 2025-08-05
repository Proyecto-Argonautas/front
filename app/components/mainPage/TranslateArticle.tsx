import {
  ChevronDown,
  ChevronUp,
  Languages,
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
const translateFormSchema = z.object({
  text: z.string().min(1, "El texto a traducir es requerido").max(500, "Máximo 500 caracteres"),
  fromLanguage: z.string().min(1, "El idioma origen es requerido"),
  toLanguage: z.string().min(1, "El idioma destino es requerido"),
});

type TranslateFormData = z.infer<typeof translateFormSchema>;
type FormErrors = Partial<Record<keyof TranslateFormData, string>>;

export default function TranslateArticle() {
  // Contextos
  const user = useContext(UserContext);
  const { travelData } = useTravel();
  
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<TranslateFormData>({
    text: "",
    fromLanguage: "es",
    toLanguage: "en",
  });
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Idiomas disponibles
  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "Inglés" },
    { code: "fr", name: "Francés" },
    { code: "de", name: "Alemán" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Portugués" },
    { code: "ru", name: "Ruso" },
    { code: "ja", name: "Japonés" },
    { code: "ko", name: "Coreano" },
    { code: "zh", name: "Chino" },
  ];

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: keyof TranslateFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Validar campo individual
    try {
      translateFormSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  // Función para traducir texto (simulación)
  const translateText = async (text: string, from: string, to: string) => {
    setIsLoading(true);
    try {
      // Simulación de traducción - en producción usarías Google Translate API o similar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Traducciones de ejemplo
      const translations: { [key: string]: string } = {
        "hola": "hello",
        "adiós": "goodbye",
        "gracias": "thank you",
        "por favor": "please",
        "buenos días": "good morning",
        "buenas noches": "good night",
        "¿cómo estás?": "how are you?",
        "me gusta": "I like it",
        "no entiendo": "I don't understand",
        "¿hablas español?": "do you speak Spanish?",
      };

      const lowerText = text.toLowerCase();
      const translated = translations[lowerText] || `[Traducción simulada de "${text}" de ${from} a ${to}]`;
      
      setTranslatedText(translated);
    } catch (error) {
      console.error("Error translating:", error);
      setTranslatedText(`[Error al traducir "${text}"]`);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const validatedData = translateFormSchema.parse(formData);
      const submissionData = {
        ...validatedData,
        component_id: nanoid(),
        component_type: "translate",
      };
      
      console.log("Datos del formulario de traducción:", submissionData);
      translateText(validatedData.text, validatedData.fromLanguage, validatedData.toLanguage);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof TranslateFormData] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    try {
      translateFormSchema.parse(formData);
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
      component_type: "translate"
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
            <Languages />
            <h2 className="flex gap-2 text-lg font-semibold min-w-10">Traductor</h2>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selección de idiomas */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Idioma origen
                </label>
                <select
                  value={formData.fromLanguage}
                  onChange={(e) => handleInputChange("fromLanguage", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                {errors.fromLanguage && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.fromLanguage}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Idioma destino
                </label>
                <select
                  value={formData.toLanguage}
                  onChange={(e) => handleInputChange("toLanguage", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                {errors.toLanguage && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.toLanguage}</span>
                )}
              </div>
            </div>

            {/* Campo de texto a traducir */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Texto a traducir
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
                className="w-full h-32 p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Escribe el texto que quieres traducir..."
              />
              {errors.text && (
                <span className="text-red-500 text-xs mt-1 block">{errors.text}</span>
              )}
            </div>

            {/* Botón de traducir */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-base font-medium transition-colors w-full max-w-xs"
              >
                <Save size={18} />
                {isLoading ? "Traduciendo..." : "Traducir"}
              </button>
            </div>
          </form>

          {/* Resultado de la traducción */}
          {translatedText && (
            <div className="mt-6 p-4 bg-light-secondary-100 rounded-lg">
              <label className="block text-sm text-gray-500 mb-2">
                Traducción
              </label>
              <div className="text-base text-gray-800 font-medium">
                {translatedText}
              </div>
              
              {/* Botón para nueva traducción */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setTranslatedText("");
                    setFormData({ text: "", fromLanguage: "es", toLanguage: "en" });
                    setIsEditing(true);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Nueva traducción
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
