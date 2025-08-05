import {
  BedDouble,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  MapPin,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useContext, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useTravel } from "~/contexts/TravelContext";
import { UserContext } from "~/contexts/UserContext";

// Esquema de validación con Zod v4
const hotelFormSchema = z
  .object({
    hotelName: z
      .string()
      .min(1, "El nombre del alojamiento es requerido")
      .max(100, "Máximo 100 caracteres"),
    checkInDate: z.string().min(1, "La fecha de entrada es requerida"),
    checkOutDate: z.string().min(1, "La fecha de salida es requerida"),
    address: z
      .string()
      .min(1, "La dirección es requerida")
      .max(200, "Máximo 200 caracteres"),
    confirmationNumber: z
      .string()
      .min(1, "El número de confirmación es requerido")
      .max(20, "Máximo 20 caracteres"),
    price: z.string().min(1, "El precio es requerido"),
    currency: z
      .string()
      .min(1, "La moneda es requerida")
      .max(3, "Máximo 3 caracteres"),
  })
  .refine(
    (data) => {
      if (data.checkInDate && data.checkOutDate) {
        return new Date(data.checkOutDate) >= new Date(data.checkInDate);
      }
      return true;
    },
    {
      message:
        "La fecha de salida debe ser igual o posterior a la fecha de entrada",
      path: ["checkOutDate"],
    },
  );

type HotelFormData = z.infer<typeof hotelFormSchema>;
type FormErrors = Partial<Record<keyof HotelFormData, string>>;

// Tipo para hoteles guardados
interface SavedHotel extends HotelFormData {
  id: string;
  component_type: "hotel";
}

export default function HotelArticleTest() {
  // Contextos
  const user = useContext(UserContext);
  const { travelData } = useTravel();

  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [savedHotels, setSavedHotels] = useState<SavedHotel[]>([]);
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
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }));
      }
    }

    // Validación especial para fechas - verificar la validación completa del formulario
    if (field === "checkInDate" || field === "checkOutDate") {
      try {
        hotelFormSchema.parse(newFormData);
        // Si pasa la validación completa, limpiar errores de fechas
        setErrors((prev) => ({
          ...prev,
          checkInDate: undefined,
          checkOutDate: undefined,
        }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const dateErrors: FormErrors = {};
          error.issues.forEach((issue) => {
            if (
              issue.path[0] === "checkOutDate" ||
              issue.path[0] === "checkInDate"
            ) {
              dateErrors[issue.path[0] as keyof HotelFormData] = issue.message;
            }
          });
          setErrors((prev) => ({ ...prev, ...dateErrors }));
        }
      }
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedData = hotelFormSchema.parse(formData);
      const newHotel: SavedHotel = {
        ...validatedData,
        id: nanoid(),
        component_type: "hotel",
      };

      // Añadir el hotel a la lista de hoteles guardados
      setSavedHotels((prev) => [...prev, newHotel]);

      // Resetear el formulario
      setFormData({
        hotelName: "",
        checkInDate: "",
        checkOutDate: "",
        address: "",
        confirmationNumber: "",
        price: "",
        currency: "USD",
      });

      // Ocultar el formulario
      setShowForm(false);
      setErrors({});

      console.log("Hotel guardado:", newHotel);
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

  // Función para eliminar un hotel específico
  const handleDeleteHotel = (hotelId: string) => {
    setSavedHotels((prev) => {
      const updatedHotels = prev.filter((hotel) => hotel.id !== hotelId);
      // Si eliminamos el último hotel, mostrar el formulario
      if (updatedHotels.length === 0) {
        setShowForm(true);
      }
      return updatedHotels;
    });
  };

  // Función para eliminar el artículo completo
  const handleDeleteArticle = () => {
    console.log("Artículo eliminado:", {
      user_id: user?.id || "unknown",
      travel_id: travelData?.destiny || "unknown",
      component_type: "hotel",
    });
    setVisible(false);
  };

  // Función para mostrar el formulario nuevamente
  const handleAddAnotherHotel = () => {
    setShowForm(true);
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Función para calcular la duración de la estancia
  const calculateNights = (checkIn: string, checkOut: string) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <h2 className="flex gap-2 text-lg font-semibold min-w-10">
              Alojamiento
            </h2>
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
          {/* Mostrar hoteles guardados */}
          {savedHotels.map((hotel) => (
            <div
              className="bg-gray-50 rounded-lg p-4 mb-4 relative"
              key={hotel.id}
            >
              {/* Botón eliminar individual - siempre visible */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => handleDeleteHotel(hotel.id)}
                title="Eliminar este hotel"
                type="button"
              >
                <X size={16} />
              </button>

              <div className="flex items-center justify-between mb-3 pr-8">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-900">
                    {hotel.hotelName}
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {calculateNights(hotel.checkInDate, hotel.checkOutDate)}{" "}
                  noches
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{hotel.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Check-in</div>
                  <div className="font-medium">
                    {formatDate(hotel.checkInDate)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Check-out</div>
                  <div className="font-medium">
                    {formatDate(hotel.checkOutDate)}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <span className="text-gray-500">Confirmación: </span>
                  <span className="font-medium">
                    {hotel.confirmationNumber}
                  </span>
                </div>
                <div className="font-medium text-emerald-600">
                  {hotel.price} {hotel.currency}
                </div>
              </div>
            </div>
          ))}

          {/* Botón para añadir otro hotel */}
          {savedHotels.length > 0 && !showForm && (
            <button
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              onClick={handleAddAnotherHotel}
              type="button"
            >
              <Plus size={18} />
              Añadir otro alojamiento
            </button>
          )}

          {/* Formulario (solo se muestra si showForm es true) */}
          {showForm && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Nombre del hotel */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Nombre del alojamiento
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) =>
                    handleInputChange("hotelName", e.target.value)
                  }
                  placeholder="Nombre del alojamiento"
                  type="text"
                  value={formData.hotelName}
                />
                {errors.hotelName && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.hotelName}
                  </span>
                )}
              </div>

              {/* Fechas de entrada y salida */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Fecha entrada
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    onChange={(e) =>
                      handleInputChange("checkInDate", e.target.value)
                    }
                    type="date"
                    value={formData.checkInDate}
                  />
                  {errors.checkInDate && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.checkInDate}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Fecha salida
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min={formData.checkInDate || undefined}
                    onChange={(e) =>
                      handleInputChange("checkOutDate", e.target.value)
                    }
                    type="date"
                    value={formData.checkOutDate}
                  />
                  {errors.checkOutDate && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.checkOutDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Dirección
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Dirección del alojamiento"
                  type="text"
                  value={formData.address}
                />
                {errors.address && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.address}
                  </span>
                )}
              </div>

              {/* Número de confirmación */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Número de confirmación
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  onChange={(e) =>
                    handleInputChange("confirmationNumber", e.target.value)
                  }
                  placeholder="Ej: 4131314"
                  type="text"
                  value={formData.confirmationNumber}
                />
                {errors.confirmationNumber && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.confirmationNumber}
                  </span>
                )}
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Precio
                </label>
                <div className="flex gap-6">
                  <input
                    className="w-36 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    type="number"
                    value={formData.price}
                  />
                  <select
                    className="w-24 border border-gray-300 rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    onChange={(e) =>
                      handleInputChange("currency", e.target.value)
                    }
                    value={formData.currency}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MXN">MXN</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                {errors.price && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.price}
                  </span>
                )}
                {errors.currency && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.currency}
                  </span>
                )}
              </div>

              {/* Botón de guardar */}
              <div className="flex justify-center pt-4">
                <button
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg text-base font-medium transition-colors w-full max-w-xs"
                  disabled={!isFormValid()}
                  type="submit"
                >
                  <Save size={18} />
                  Guardar
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </article>
  );
}
