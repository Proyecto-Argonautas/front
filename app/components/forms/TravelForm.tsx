import { Minus, Plus } from "lucide-react";
import type React from "react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { UserContext } from "~/contexts/UserContext";

// Esquema validacion Zod
const travelFormSchema = z
  .object({
    destiny: z.string().min(1, "Este campo está vacío"),
    startDate: z.string().min(1, "Este campo está vacío"),
    endDate: z.string().min(1, "Este campo está vacío"),
    companions: z.array(z.string()).optional(),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message:
      "La fecha de inicio debe ser anterior o igual a la fecha de finalización",
    path: ["endDate"],
  })
  .refine((data) => {
    // Si hay companions, todos deben tener nombre (no vacíos)
    if (data.companions && data.companions.length > 0) {
      const filledNames = data.companions.filter(name => name.trim() !== "");
      return filledNames.length === data.companions.length;
    }
    return true;
  }, {
    message: "Debes poner nombre al acompañante",
    path: ["companions"],
  });

export type TravelFormData = z.infer<typeof travelFormSchema>;

type TravelFormProps = {
  defaultValues?: Partial<TravelFormData>;
};

export const TravelForm: React.FC<TravelFormProps> = ({
  defaultValues,
}) => {
  const [numberOfMembers, setNumberOfMembers] = useState(0);
  const [companions, setCompanions] = useState<string[]>(defaultValues?.companions || []);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [startDate, setStartDate] = useState(defaultValues?.startDate || "");
  const [endDate, setEndDate] = useState(defaultValues?.endDate || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useContext(UserContext);

  const handleNumberChange = (num: number) => {
    setNumberOfMembers(num);
    if (num > companions.length) {
      setCompanions([
        ...companions,
        ...Array(num - companions.length).fill(""),
      ]);
    } else {
      setCompanions(companions.slice(0, num));
    }
  };

  const handleMemberNameChange = (index: number, name: string) => {
    const updatedNames = [...companions];
    updatedNames[index] = name;
    setCompanions(updatedNames);
    
    // Validar si todos los miembros tienen nombre
    const filledNames = updatedNames.filter(memberName => memberName.trim() !== "");
    if (numberOfMembers > 0 && filledNames.length === numberOfMembers) {
      // Si todos los miembros tienen nombre, quitar el error
      const newErrors = { ...errors };
      delete newErrors.companions;
      setErrors(newErrors);
    }
  };

  const validateField = (field: string, value: string, additionalData?: any) => {
    try {
      if (field === 'destiny') {
        z.string().min(1, "Este campo está vacío").parse(value);
        const newErrors = { ...errors };
        delete newErrors.destiny;
        setErrors(newErrors);
      } else if (field === 'startDate') {
        z.string().min(1, "Este campo está vacío").parse(value);
        const newErrors = { ...errors };
        delete newErrors.startDate;
        // También validar la relación con endDate si existe
        if (additionalData?.endDate && value && additionalData.endDate) {
          if (new Date(value) <= new Date(additionalData.endDate)) {
            delete newErrors.endDate;
          }
        }
        setErrors(newErrors);
      } else if (field === 'endDate') {
        z.string().min(1, "Este campo está vacío").parse(value);
        const newErrors = { ...errors };
        delete newErrors.endDate;
        // Validar la relación con startDate si existe
        if (additionalData?.startDate && value && additionalData.startDate) {
          if (new Date(additionalData.startDate) <= new Date(value)) {
            delete newErrors.endDate;
          } else {
            newErrors.endDate = "La fecha de inicio debe ser anterior o igual a la fecha de finalización";
          }
        }
        setErrors(newErrors);
      }
    } catch {
      // Si hay error en la validación, mantener el error existente
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const data = {
      destiny: (event.currentTarget.elements.namedItem("destiny") as HTMLInputElement)?.value || "",
      startDate: startDate,
      endDate: endDate,
      companions: companions, // Enviar todos los nombres, incluidos los vacíos para validación
    };

    try {
      const validatedData = travelFormSchema.parse(data);
      // Filtrar nombres vacíos solo después de la validación exitosa
      const finalData = {
        ...validatedData,
        companions: validatedData.companions?.filter(name => name.trim() !== "") || [],
        userId: user?.id
      };
      
      console.log("Datos del formulario:", finalData);
      setErrors({});
      
      // Realizar petición POST al backend
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_BASE_URL}/travel/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalData),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        toast.success("Viaje creado correctamente");
        
        // Opcional: limpiar el formulario después del éxito
        // resetForm();
        
      } catch (fetchError) {
        console.error("Error al enviar al backend:", fetchError);
        toast.error("Error al crear el viaje. Intenta de nuevo.");
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: {[key: string]: string} = {};
        let hasEmptyFields = false;
        
        error.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            newErrors[issue.path[0] as string] = issue.message;
            if (issue.message === "Este campo está vacío") {
              hasEmptyFields = true;
            }
          }
        });
        
        setErrors(newErrors);
        console.error("Errores de validación:", newErrors);
        
        if (hasEmptyFields) {
          toast.error("Por favor, completa todos los campos requeridos");
        } else if (newErrors.companions) {
          toast.error("Por favor, completa los nombres de los acompañantes");
        } else {
          toast.error("Hay errores en el formulario");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="border border-gray-300 rounded-lg p-3 mb-4">
        {/* Destination Form */}
        <div className="rounded-xl p-4">
          <label
            className="block text-gray-800 font-semibold mb-1"
            htmlFor="destination-input"
          >
            ¿A dónde?
            <span className="text-gray-500 font-normal ml-2">
              p. ej., París, Hawái, Japón
            </span>
          </label>
          <input
            name="destiny"
            className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="destiny-input"
            placeholder="Ingresa un destino"
            type="text"
            defaultValue={defaultValues?.destiny || ""}
            onChange={(e) => validateField('destiny', e.target.value)}
          />
          {errors.destiny && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destiny}
            </p>
          )}
        </div>

        {/* Date Form */}
        <div className="rounded-xl p-4 w-full max-w-xl">
          <label
            className="block font-semibold text-gray-800 mb-2"
            htmlFor="start-date"
          >
            Fechas
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Calendario</title>
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <input
                name="startDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="start-date"
                placeholder="Fecha de inicio"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  validateField('startDate', e.target.value, { endDate: endDate });
                }}
              />
            </div>

            {/* Fecha de finalización */}
            <div className="flex items-center gap-2 w-full">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Calendario</title>
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <input
                name="endDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Fecha de finalización"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  validateField('endDate', e.target.value, { startDate: startDate });
                }}
              />
            </div>
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate}
            </p>
          )}
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate}
            </p>
          )}
        </div>
      </div>

      {/* Members Form */}
      <div className="border border-gray-300 rounded-lg p-3">
        <div className="w-full">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="text-base font-semibold text-gray-800">
              Acompañantes <span className="text-gray-500">(opcional)</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                aria-label="Disminuir miembros"
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-light-primary text-gray-700 hover:bg-light-secondary-100 transition disabled:opacity-50"
                disabled={numberOfMembers <= 0}
                onClick={() =>
                  handleNumberChange(Math.max(0, numberOfMembers - 1))
                }
                type="button"
              >
                <Minus className="w-3 h-3" />
              </button>

              <span className="text-base font-semibold w-6 text-center">
                {numberOfMembers}
              </span>

              <button
                aria-label="Aumentar miembros"
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-light-primary text-gray-700 hover:bg-light-secondary-100 transition disabled:opacity-50"
                disabled={numberOfMembers >= 20}
                onClick={() =>
                  handleNumberChange(Math.min(20, numberOfMembers + 1))
                }
                type="button"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid gap-2">
            {Array.from({ length: numberOfMembers }).map((_, index) => (
              <div className="mb-2" key={`member-${index}`}>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor={`member-${index}`}
                >
                  Nombre del miembro {index + 1}
                </label>
                <input
                  className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  id={`member-${index}`}
                  onChange={(e) =>
                    handleMemberNameChange(index, e.target.value)
                  }
                  placeholder={`Miembro ${index + 1}`}
                  type="text"
                  value={companions[index] || ""}
                />
              </div>
            ))}
          </div>
          {errors.companions && (
            <p className="text-red-500 text-sm mt-2">
              {errors.companions}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full bg-cold-light-400 text-white py-2 px-4 rounded-md hover:bg-cold-light-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creando viaje..." : "Enviar"}
      </button>
    </form>
  );
};

export default TravelForm;
