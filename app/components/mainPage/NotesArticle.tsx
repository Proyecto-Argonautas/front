import {
  ChevronDown,
  ChevronUp,
  Ellipsis,
  NotebookPen,
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
const notesFormSchema = z.object({
  noteText: z.string().min(1, "El texto de la nota es requerido").max(1000, "Máximo 1000 caracteres"),
});

type NotesFormData = z.infer<typeof notesFormSchema>;
type FormErrors = Partial<Record<keyof NotesFormData, string>>;

interface NotesArticleProps {
  defaultOpen?: boolean;
  alignment?: "left" | "center" | "right";
}

export default function NotesArticle({
  defaultOpen = false,
  alignment = "center",
}: NotesArticleProps) {
  // Contextos
  const user = useContext(UserContext);
  const { travelData } = useTravel();
  
  const [open, setOpen] = useState(defaultOpen);
  const [showOptions, setShowOptions] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<NotesFormData>({
    noteText: "",
  });
  const optionsRef = useRef<HTMLDivElement>(null);

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: keyof NotesFormData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Validar campo individual
    try {
      notesFormSchema.pick({ [field]: true }).parse({ [field]: value });
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
      const validatedData = notesFormSchema.parse(formData);
      const submissionData = {
        ...validatedData,
        component_id: nanoid(),
        component_type: "notes",
      };
      
      console.log("Datos del formulario de notas:", submissionData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof NotesFormData] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // Verificar si el formulario es válido
  const isFormValid = () => {
    try {
      notesFormSchema.parse(formData);
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
      component_type: "note"
    });
    setVisible(false);
  };

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "mr-auto";
      case "right":
        return "ml-auto";
      case "center":
      default:
        return "mx-auto";
    }
  };

  // Cierra el menú si se hace clic fuera de él
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

  if (!visible) return null; // No renderizar si está "eliminado"

  return (
    <article
      className={`relative w-full ${getAlignmentClass()} mt-2 bg-light-primary rounded-2xl shadow-md`}
    >
      <button
        aria-controls="notes-article-content"
        aria-expanded={open}
        className="flex items-center w-full p-4 cursor-pointer bg-transparent border-0 outline-none"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center gap-2 mr-auto">
          <NotebookPen />
          <h2 className="flex gap-2 text-lg font-semibold min-w-10">Notes </h2>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>

      <div className="absolute top-4 right-4" ref={optionsRef}>
        <button
          className="p-1"
          onClick={() => setShowOptions((prev) => !prev)}
          type="button"
        >
          <Ellipsis />
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 w-32 bg-light-primary border rounded-lg shadow-lg z-10">
            <button
              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-light-secondary-100"
              onClick={handleDeleteArticle}
              type="button"
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {open && (
        <div className="border-t px-4 py-4 space-y-4 text-sm text-gray-700" id="notes-article-content">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de texto para notas */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Notas
              </label>
              <textarea
                value={formData.noteText}
                onChange={(e) => handleInputChange("noteText", e.target.value)}
                className="w-full h-48 p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Escribe tus notas aquí..."
              />
              {errors.noteText && (
                <span className="text-red-500 text-xs mt-1 block">{errors.noteText}</span>
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
