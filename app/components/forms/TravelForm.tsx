import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Esquema validación Zod
const travelFormSchema = z
  .object({
    destination: z.string().min(1, "El destino es requerido"),
    startDate: z.string().min(1, "La fecha de inicio es requerida"),
    endDate: z.string().min(1, "La fecha de finalización es requerida"),
    numberOfMembers: z.number().min(0).max(20),
    memberNames: z.array(z.string()).optional(),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message:
      "La fecha de inicio debe ser anterior o igual a la fecha de finalización",
    path: ["endDate"],
  });

export type TravelFormData = z.infer<typeof travelFormSchema>;

type TravelFormProps = {
  onSubmit: (data: TravelFormData) => void;
  defaultValues?: Partial<TravelFormData>;
};

export const TravelForm: React.FC<TravelFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      numberOfMembers: 0,
      memberNames: [],
      ...defaultValues,
    },
  });

  const numberOfMembers = watch("numberOfMembers");
  const memberNames = watch("memberNames") || [];

  const handleNumberChange = (num: number) => {
    setValue("numberOfMembers", num);
    if (num > memberNames.length) {
      setValue("memberNames", [
        ...memberNames,
        ...Array(num - memberNames.length).fill(""),
      ]);
    } else {
      setValue("memberNames", memberNames.slice(0, num));
    }
  };

  const handleMemberNameChange = (index: number, name: string) => {
    const updatedNames = [...memberNames];
    updatedNames[index] = name;
    setValue("memberNames", updatedNames);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("destination")}
            className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="destination-input"
            placeholder="Ingresa un destino"
            type="text"
          />
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
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
                {...register("startDate")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="start-date"
                placeholder="Fecha de inicio"
                type="date"
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
                {...register("endDate")}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Fecha de finalización"
                type="date"
              />
            </div>
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
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
            {Array.from({ length: numberOfMembers }).map((_, index) => {
              const key = memberNames[index]
                ? `${memberNames[index]}-${index}`
                : `member-${index}`;
              return (
                <div className="mb-2" key={key}>
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
                    value={memberNames[index] || ""}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TravelForm;
