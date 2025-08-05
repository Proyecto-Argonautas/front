import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  PlaneTakeoff,
  Trash2,
  Save,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { nanoid } from "nanoid";

// Esquema de validación con Zod v4
const flightFormSchema = z.object({
  airline: z.string().min(1, "La aerolínea es requerida").max(100, "Máximo 100 caracteres"),
  flightNumber: z.string().min(1, "El número de vuelo es requerido").max(20, "Máximo 20 caracteres"),
  departureCity: z.string().min(1, "La ciudad de origen es requerida").max(100, "Máximo 100 caracteres"),
  departureCode: z.string().min(2, "Código de origen requerido").max(5, "Máximo 5 caracteres"),
  arrivalCity: z.string().min(1, "La ciudad de destino es requerida").max(100, "Máximo 100 caracteres"),
  arrivalCode: z.string().min(2, "Código de destino requerido").max(5, "Máximo 5 caracteres"),
  departureDate: z.string().min(1, "La fecha de salida es requerida"),
  departureTime: z.string().min(1, "La hora de salida es requerida"),
  arrivalTime: z.string().min(1, "La hora de llegada es requerida"),
  confirmationNumber: z.string().min(1, "El número de confirmación es requerido").max(20, "Máximo 20 caracteres"),
  price: z.string().min(1, "El precio es requerido"),
  currency: z.string().min(1, "La moneda es requerida").max(3, "Máximo 3 caracteres"),
});

type FlightFormData = z.infer<typeof flightFormSchema>;
type FormErrors = Partial<Record<keyof FlightFormData, string>>;

export default function FlightArticle() {
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FlightFormData>({
    airline: "",
    flightNumber: "",
    departureCity: "",
    departureCode: "",
    arrivalCity: "",
    arrivalCode: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    confirmationNumber: "",
    price: "",
    currency: "USD",
  });
  const optionsRef = useRef<HTMLDivElement>(null);

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: keyof FlightFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Validar campo individual
    try {
      flightFormSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const validatedData = flightFormSchema.parse(formData);
      const submissionData = {
        ...validatedData,
        price: parseFloat(validatedData.price),
        component_id: nanoid(),
        component_type: "flight",
      };
      
      console.log("Datos del formulario de vuelo:", submissionData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof FlightFormData] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    try {
      flightFormSchema.parse(formData);
      return true;
    } catch {
      return false;
    }
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

  if (!visible) return null; // No renderiza si fue eliminado

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
            <PlaneTakeoff />
            <h2 className="flex gap-2 text-lg font-semibold min-w-10">Flights</h2>
            {open ? <ChevronUp /> : <ChevronDown />}
          </div>
        </button>

        <div className="absolute top-4 right-4" ref={optionsRef}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita abrir/cerrar el acordeón
              setShowOptions((prev) => !prev);
            }}
            type="button"
          >
            <Ellipsis />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-light-primary border rounded-lg shadow-md z-20">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-light-secondary-100"
                onClick={() => setVisible(false)}
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
            {/* Aerolínea y número de vuelo */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Aerolínea
                </label>
                <input
                  type="text"
                  value={formData.airline}
                  onChange={(e) => handleInputChange("airline", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="United Airlines"
                />
                {errors.airline && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.airline}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Número de vuelo
                </label>
                <input
                  type="text"
                  value={formData.flightNumber}
                  onChange={(e) => handleInputChange("flightNumber", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="UA 295"
                />
                {errors.flightNumber && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.flightNumber}</span>
                )}
              </div>
            </div>

            {/* Origen */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Ciudad origen
                </label>
                <input
                  type="text"
                  value={formData.departureCity}
                  onChange={(e) => handleInputChange("departureCity", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="San Francisco"
                />
                {errors.departureCity && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.departureCity}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Código origen
                </label>
                <input
                  type="text"
                  value={formData.departureCode}
                  onChange={(e) => handleInputChange("departureCode", e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="SFO"
                  maxLength={5}
                />
                {errors.departureCode && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.departureCode}</span>
                )}
              </div>
            </div>

            {/* Destino */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Ciudad destino
                </label>
                <input
                  type="text"
                  value={formData.arrivalCity}
                  onChange={(e) => handleInputChange("arrivalCity", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Newark"
                />
                {errors.arrivalCity && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.arrivalCity}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Código destino
                </label>
                <input
                  type="text"
                  value={formData.arrivalCode}
                  onChange={(e) => handleInputChange("arrivalCode", e.target.value.toUpperCase())}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="EWR"
                  maxLength={5}
                />
                {errors.arrivalCode && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.arrivalCode}</span>
                )}
              </div>
            </div>

            {/* Fecha de vuelo */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Fecha de vuelo
              </label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange("departureDate", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {errors.departureDate && (
                <span className="text-red-500 text-xs mt-1 block">{errors.departureDate}</span>
              )}
            </div>

            {/* Horarios */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Hora salida
                </label>
                <input
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => handleInputChange("departureTime", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.departureTime && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.departureTime}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Hora llegada
                </label>
                <input
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) => handleInputChange("arrivalTime", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.arrivalTime && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.arrivalTime}</span>
                )}
              </div>
            </div>

            {/* Número de confirmación */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Número de confirmación
              </label>
              <input
                type="text"
                value={formData.confirmationNumber}
                onChange={(e) => handleInputChange("confirmationNumber", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="4131314"
              />
              {errors.confirmationNumber && (
                <span className="text-red-500 text-xs mt-1 block">{errors.confirmationNumber}</span>
              )}
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Precio
              </label>
              <div className="flex gap-6">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-36 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="0.00"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-24 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="MXN">MXN</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              {errors.price && (
                <span className="text-red-500 text-xs mt-1 block">{errors.price}</span>
              )}
              {errors.currency && (
                <span className="text-red-500 text-xs mt-1 block">{errors.currency}</span>
              )}
            </div>

            {/* Botón de guardar */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={!isFormValid()}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-base font-medium transition-colors w-full max-w-xs"
              >
                <Save size={18} />
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </article>
  );
}
