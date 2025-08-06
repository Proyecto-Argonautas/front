import {
  ChevronDown,
  ChevronUp,
  MapPin,
  NotebookPen,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useTravel } from "~/contexts/TravelContext";
import type { handlePages } from "~/types/navigationButtons";

export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "resume", content: "Nombre viaje" },
  ];
}

export const handle: handlePages = {
  buttons: ["home", "profile"],
};

export default function ItineraryPage() {
  const { travelData } = useTravel();
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [dayPlaces, setDayPlaces] = useState<{
    [dayIndex: number]: { id: string; content: string }[];
  }>({});
  const [addingPlace, setAddingPlace] = useState<{
    [dayIndex: number]: boolean;
  }>({});
  const [newPlace, setNewPlace] = useState<{ [dayIndex: number]: string }>({});
  const [editingPlace, setEditingPlace] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [editPlaceText, setEditPlaceText] = useState<{ [key: string]: string }>(
    {},
  );
  const [dayNotes, setDayNotes] = useState<{
    [dayIndex: number]: { id: string; content: string } | null;
  }>({});
  const [editingNotes, setEditingNotes] = useState<{
    [dayIndex: number]: boolean;
  }>({});

  // Función para generar los días del viaje
  const generateTravelDays = () => {
    if (!travelData.startDate || !travelData.endDate) {
      return [];
    }

    const startDate = new Date(travelData.startDate);
    const endDate = new Date(travelData.endDate);
    const days = [];

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  // Función para formatear la fecha en español
  const formatDate = (date: Date) => {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return `${dayName}. ${day}/${month}`;
  };

  // Función para determinar el estado del día
  const getDayStatus = (date: Date) => {
    const today = new Date();
    const dayDate = new Date(date);

    // Normalizar las fechas para comparar solo día/mes/año
    today.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);

    if (dayDate < today) return 'past';
    if (dayDate.getTime() === today.getTime()) return 'today';
    return 'future';
  };

  // Función para obtener la clase CSS del punto según el estado
  const getDayStatusColor = (status: string) => {
    switch (status) {
      case 'past': return 'bg-red-400';
      case 'today': return 'bg-blue-400';
      case 'future': return 'bg-emerald-400';
      default: return 'bg-emerald-500';
    }
  };

  // Función para toggle de expandir/contraer día
  const toggleDay = (dayIndex: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((index) => index !== dayIndex)
        : [...prev, dayIndex],
    );
  };

  // Función para agregar un lugar a un día específico
  const addPlace = (dayIndex: number) => {
    const place = newPlace[dayIndex]?.trim();
    if (place) {
      // Generar ID único de 36 caracteres
      const id = nanoid(36);

      // Console log para el nuevo lugar
      console.log({
        id,
        travel_id: "1",
        type: "location" as const,
        content: place,
      });

      setDayPlaces((prev) => ({
        ...prev,
        [dayIndex]: [...(prev[dayIndex] || []), { id, content: place }],
      }));
      setNewPlace((prev) => ({ ...prev, [dayIndex]: "" }));
      setAddingPlace((prev) => ({ ...prev, [dayIndex]: false }));
    }
  };

  // Función para eliminar un lugar
  const removePlace = (dayIndex: number, placeIndex: number) => {
    const placeToDelete = dayPlaces[dayIndex]?.[placeIndex];
    if (placeToDelete) {
      // Console log para DELETE
      console.log({
        action: "DELETE",
        id: placeToDelete.id,
      });
    }

    setDayPlaces((prev) => ({
      ...prev,
      [dayIndex]:
        prev[dayIndex]?.filter((_, index) => index !== placeIndex) || [],
    }));
  };

  // Función para empezar a editar un lugar
  const startEditingPlace = (
    dayIndex: number,
    placeIndex: number,
    currentText: string,
  ) => {
    const key = `${dayIndex}-${placeIndex}`;
    setEditingPlace((prev) => ({ ...prev, [key]: true }));
    setEditPlaceText((prev) => ({ ...prev, [key]: currentText }));
  };

  // Función para guardar la edición de un lugar
  const saveEditPlace = (dayIndex: number, placeIndex: number) => {
    const key = `${dayIndex}-${placeIndex}`;
    const newText = editPlaceText[key]?.trim();
    const placeToUpdate = dayPlaces[dayIndex]?.[placeIndex];

    if (newText && placeToUpdate) {
      // Console log para UPDATE
      console.log({
        action: "UPDATE",
        id: placeToUpdate.id,
        travel_id: "1",
        type: "location" as const,
        content: newText,
      });

      setDayPlaces((prev) => ({
        ...prev,
        [dayIndex]:
          prev[dayIndex]?.map((place, index) =>
            index === placeIndex ? { ...place, content: newText } : place,
          ) || [],
      }));
    }

    setEditingPlace((prev) => ({ ...prev, [key]: false }));
    setEditPlaceText((prev) => ({ ...prev, [key]: "" }));
  };

  // Función para cancelar la edición de un lugar
  const cancelEditPlace = (dayIndex: number, placeIndex: number) => {
    const key = `${dayIndex}-${placeIndex}`;
    setEditingPlace((prev) => ({ ...prev, [key]: false }));
    setEditPlaceText((prev) => ({ ...prev, [key]: "" }));
  };

  // Función para manejar el Enter en el input
  const handleKeyPress = (e: React.KeyboardEvent, dayIndex: number) => {
    if (e.key === "Enter") {
      addPlace(dayIndex);
    }
  };

  // Función para empezar a agregar un lugar
  const startAddingPlace = (dayIndex: number) => {
    setAddingPlace((prev) => ({ ...prev, [dayIndex]: true }));
  };

  // Función para cancelar agregar lugar
  const cancelAddingPlace = (dayIndex: number) => {
    setAddingPlace((prev) => ({ ...prev, [dayIndex]: false }));
    setNewPlace((prev) => ({ ...prev, [dayIndex]: "" }));
  };

  // Función para empezar a editar notas
  const startEditingNotes = (dayIndex: number) => {
    setEditingNotes((prev) => ({ ...prev, [dayIndex]: true }));
  };

  // Función para guardar notas
  const saveNotes = (dayIndex: number, notes: string) => {
    const trimmedNotes = notes.trim();
    const existingNote = dayNotes[dayIndex];

    if (trimmedNotes) {
      if (existingNote) {
        // UPDATE nota existente
        console.log({
          action: "UPDATE",
          id: existingNote.id,
          travel_id: "1",
          type: "note" as const,
          content: trimmedNotes,
        });
        setDayNotes((prev) => ({
          ...prev,
          [dayIndex]: { ...existingNote, content: trimmedNotes },
        }));
      } else {
        // CREATE nueva nota
        const id = nanoid(36);
        console.log({
          id,
          travel_id: "1",
          type: "note" as const,
          content: trimmedNotes,
        });
        setDayNotes((prev) => ({
          ...prev,
          [dayIndex]: { id, content: trimmedNotes },
        }));
      }
    }

    setEditingNotes((prev) => ({ ...prev, [dayIndex]: false }));
  };

  // Función para cancelar edición de notas
  const cancelEditingNotes = (dayIndex: number) => {
    setEditingNotes((prev) => ({ ...prev, [dayIndex]: false }));
  };

  // Función para eliminar notas
  const removeNotes = (dayIndex: number) => {
    const noteToDelete = dayNotes[dayIndex];
    if (noteToDelete) {
      // Console log para DELETE
      console.log({
        action: "DELETE",
        id: noteToDelete.id,
      });
    }
    setDayNotes((prev) => ({ ...prev, [dayIndex]: null }));
  };

  const travelDays = generateTravelDays();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Itinerario - {travelData.destiny || "Tu destino"} 📍
          </h1>
          <p className="text-gray-600">{travelDays.length} días de viaje</p>
        </div>

        {/* Días del itinerario */}
        <div className="space-y-4">
          {travelDays.map((day, index) => {
            // console.log("Día renderizado:", day);
            return (
              <div
                className="bg-white rounded-2xl shadow-md overflow-hidden"
                id={day.toISOString().slice(0, 19).replace("T", " ")}
                key={index}
              >
              {/* Header del día */}
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleDay(index)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${getDayStatusColor(getDayStatus(day))} rounded-full`}></div>
                  <span className="text-xl font-semibold text-gray-800">
                    {formatDate(day)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {expandedDays.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

                {/* Contenido expandible */}
                {expandedDays.includes(index) && (
                  <div className="border-t bg-gray-50 p-4">
                    {/* Lista de lugares añadidos */}
                    {dayPlaces[index] && dayPlaces[index].length > 0 && (
                      <div className="space-y-2 mb-4">
                        {dayPlaces[index].map((place, placeIndex) => {
                          const key = `${index}-${placeIndex}`;
                          const isEditing = editingPlace[key];

                          return (
                            <div
                              className="bg-white rounded-lg p-3 shadow-sm"
                              key={place.id}
                            >
                              {isEditing ? (
                                /* Modo edición */
                                <div className="flex gap-1.5">
                                  <div className="flex-1 min-w-0 flex items-center gap-2 p-2 border-2 border-emerald-500 rounded-lg">
                                    <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <input
                                      autoFocus
                                      className="flex-1 min-w-0 outline-none text-gray-800 text-sm"
                                      onChange={(e) =>
                                        setEditPlaceText((prev) => ({
                                          ...prev,
                                          [key]: e.target.value,
                                        }))
                                      }
                                      onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                          saveEditPlace(index, placeIndex);
                                        }
                                      }}
                                      type="text"
                                      value={editPlaceText[key] || ""}
                                    />
                                  </div>
                                  <button
                                    className="px-2 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                                    disabled={!editPlaceText[key]?.trim()}
                                    onClick={() =>
                                      saveEditPlace(index, placeIndex)
                                    }
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                  <button
                                    className="px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex-shrink-0"
                                    onClick={() =>
                                      cancelEditPlace(index, placeIndex)
                                    }
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                /* Modo visualización */
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <MapPin className="w-4 h-4 text-emerald-500" />
                                    <span className="text-gray-800">
                                      {place.content}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 ml-2">
                                    <button
                                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                                      onClick={() =>
                                        startEditingPlace(
                                          index,
                                          placeIndex,
                                          place.content,
                                        )
                                      }
                                      title="Editar lugar"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      className="text-gray-400 hover:text-red-500 transition-colors"
                                      onClick={() =>
                                        removePlace(index, placeIndex)
                                      }
                                      title="Eliminar lugar"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Mostrar notas guardadas */}
                    {dayNotes[index] && !editingNotes[index] && (
                      <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <NotebookPen className="w-4 h-4 text-blue-500 mt-1" />
                            <div className="flex-1">
                              <p className="text-gray-800 whitespace-pre-wrap">
                                {dayNotes[index]?.content}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <button
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                              onClick={() => startEditingNotes(index)}
                              title="Editar notas"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              onClick={() => removeNotes(index)}
                              title="Eliminar notas"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Input para añadir lugares (solo si está en modo de añadir lugar) */}
                    {addingPlace[index] && (
                      <div className="flex gap-1.5 mb-4">
                        <div className="flex-1 min-w-0 flex items-center gap-2 p-2 bg-white rounded-lg border-2 border-emerald-500">
                          <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <input
                            autoFocus
                            className="flex-1 min-w-0 outline-none text-gray-800 text-sm"
                            onChange={(e) =>
                              setNewPlace((prev) => ({
                                ...prev,
                                [index]: e.target.value,
                              }))
                            }
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            placeholder="Escribe un lugar..."
                            type="text"
                            value={newPlace[index] || ""}
                          />
                        </div>
                        <button
                          className="px-2 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                          disabled={!newPlace[index]?.trim()}
                          onClick={() => addPlace(index)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          className="px-2 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex-shrink-0"
                          onClick={() => cancelAddingPlace(index)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Textarea para editar notas */}
                    {editingNotes[index] && (
                      <div className="mb-4">
                        <div className="bg-white rounded-lg border-2 border-blue-500 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <NotebookPen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              Notas del día
                            </span>
                          </div>
                          <textarea
                            autoFocus
                            className="w-full h-20 outline-none text-gray-800 resize-none text-sm"
                            defaultValue={dayNotes[index]?.content || ""}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && e.ctrlKey) {
                                const target = e.target as HTMLTextAreaElement;
                                saveNotes(index, target.value);
                              }
                            }}
                            placeholder="Escribe tus notas para este día..."
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              className="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                              onClick={(e) => {
                                const textarea =
                                  e.currentTarget.parentElement?.parentElement?.querySelector(
                                    "textarea",
                                  ) as HTMLTextAreaElement;
                                saveNotes(index, textarea?.value || "");
                              }}
                            >
                              Guardar
                            </button>
                            <button
                              className="px-3 py-1.5 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                              onClick={() => cancelEditingNotes(index)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botones principales: Añadir lugar y Notas (siempre visibles si no está en modo edición) */}
                    {!addingPlace[index] && !editingNotes[index] && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Botón Añadir lugar */}
                        <button
                          className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-colors cursor-pointer"
                          onClick={() => startAddingPlace(index)}
                        >
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500 text-sm">
                            Añadir un lugar
                          </span>
                        </button>

                        {/* Botón Notas */}
                        <button
                          className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => startEditingNotes(index)}
                        >
                          <NotebookPen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500 text-sm">Notas</span>
                        </button>
                      </div>
                    )}

                    {/* Info del día */}
                    <div className="text-sm text-gray-600">
                      <p>Día {index + 1} de tu viaje</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(() => {
                          const placesCount = dayPlaces[index]?.length || 0;
                          const hasNotes =
                            !!dayNotes[index]?.content &&
                            dayNotes[index]?.content.trim().length > 0;

                          if (placesCount > 0 && hasNotes) {
                            return `${placesCount} lugar${placesCount > 1 ? "es" : ""} y notas añadidas`;
                          } else if (placesCount > 0) {
                            return `${placesCount} lugar${placesCount > 1 ? "es" : ""} añadido${placesCount > 1 ? "s" : ""}`;
                          } else if (hasNotes) {
                            return "Notas añadidas";
                          } else {
                            return "Planifica tus actividades para este día";
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mensaje si no hay fechas */}
        {travelDays.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No hay fechas de viaje configuradas
              </h3>
              <p className="text-gray-600">
                Configura las fechas de inicio y fin en tu formulario de viaje
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
