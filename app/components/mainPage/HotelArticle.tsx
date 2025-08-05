import {
  BedDouble,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Trash2,
  Save,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { nanoid } from "nanoid";

// Esquema de validación con Zod v4
const hotelFormSchema = z.object({
  hotelName: z.string().min(1, "El nombre del hotel es requerido").max(100, "Máximo 100 caracteres"),
  checkInDate: z.string().min(1, "La fecha de entrada es requerida"),
  checkOutDate: z.string().min(1, "La fecha de salida es requerida"),
  address: z.string().min(1, "La dirección es requerida").max(200, "Máximo 200 caracteres"),
  confirmationNumber: z.string().min(1, "El número de confirmación es requerido").max(20, "Máximo 20 caracteres"),
  price: z.string().min(1, "El precio es requerido"),
  currency: z.string().min(1, "La moneda es requerida").max(3, "Máximo 3 caracteres"),
}).refine((data) => {
  if (data.checkInDate && data.checkOutDate) {
    return new Date(data.checkOutDate) >= new Date(data.checkInDate);
  }
  return true;
}, {
  message: "La fecha de salida debe ser igual o posterior a la fecha de entrada",
  path: ["checkOutDate"],
});

type HotelFormData = z.infer<typeof hotelFormSchema>;
type FormErrors = Partial<Record<keyof HotelFormData, string>>;

export default function HotelArticleTest() {
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<HotelFormData>({
    hotelName: "",
    checkInDate: "",
    checkOutDate: "",
    address: "",
    confirmationNumber: "",
    price: "",
    currency: "USD",
  });
  const optionsRef = useRef<HTMLDivElement>(null);

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: keyof HotelFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Validar campo individual
    try {
      hotelFormSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0].message }));
      }
    }

    // Validación especial para fechas - verificar la validación completa del formulario
    if (field === "checkInDate" || field === "checkOutDate") {
      try {
        hotelFormSchema.parse(newFormData);
        // Si pasa la validación completa, limpiar errores de fechas
        setErrors(prev => ({ 
          ...prev, 
          checkInDate: undefined, 
          checkOutDate: undefined 
        }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const dateErrors: FormErrors = {};
          error.issues.forEach((issue) => {
            if (issue.path[0] === "checkOutDate" || issue.path[0] === "checkInDate") {
              dateErrors[issue.path[0] as keyof HotelFormData] = issue.message;
            }
          });
          setErrors(prev => ({ ...prev, ...dateErrors }));
        }
      }
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const validatedData = hotelFormSchema.parse(formData);
      const submissionData = {
        ...validatedData,
        price: parseFloat(validatedData.price),
        component_id: nanoid(),
        component_type: "hotel",
      };
      
      console.log("Datos del formulario de hotel:", submissionData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof HotelFormData] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    try {
      hotelFormSchema.parse(formData);
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

  if (!visible) return null; // Oculta el artículo si se elimina

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
            <BedDouble />
            <h2 className="flex gap-2 text-lg font-semibold min-w-10">Hotels</h2>
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
            {/* Nombre del hotel */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Nombre del hotel
              </label>
              <input
                type="text"
                value={formData.hotelName}
                onChange={(e) => handleInputChange("hotelName", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ingresa el nombre del hotel"
              />
              {errors.hotelName && (
                <span className="text-red-500 text-xs mt-1 block">{errors.hotelName}</span>
              )}
            </div>

            {/* Fechas de entrada y salida */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Fecha entrada
                </label>
                <input
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.checkInDate && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.checkInDate}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Fecha salida
                </label>
                <input
                  type="date"
                  value={formData.checkOutDate}
                  onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                  min={formData.checkInDate || undefined}
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {errors.checkOutDate && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.checkOutDate}</span>
                )}
              </div>
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Dirección del hotel"
              />
              {errors.address && (
                <span className="text-red-500 text-xs mt-1 block">{errors.address}</span>
              )}
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
                placeholder="Ej: 4131314"
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
