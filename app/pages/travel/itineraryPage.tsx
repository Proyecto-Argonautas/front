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
  return (
    <div>
      <p>ItineraryPage!!!!!!!</p>
    </div>
  );
}
