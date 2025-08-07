import { User } from "lucide-react";
import React from "react";

interface DestinationCardProps {
  image: string;
  title: string;
  members: number;
  startDate: string;
  endDate: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Set both dates to the start of the day to ensure accurate day calculation
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  return diffDays;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  image,
  title,
  members,
  startDate,
  endDate,
}) => {
  // Acceso al contexto disponible para componentes hijos si es necesario
  const days = calculateDays(startDate, endDate);

  return (
    <div className="mx-auto rounded-xl shadow-md bg-light-primary overflow-hidden">
      <img
        // TODO hacer que se vea bien la imagen
        alt={title}
        className="object-cover object-center w-full h-40"
        src={image}
      />

      <div className="p-4 text-center">
        <div className="flex">
          <User className="w-5 h-5 text-gray-600" />

          <span className="text-gray-700">
            {members} {members !== 1 ? "" : ""}
          </span>

          <h2 className="mx-auto text-lg font-semibold text-gray-800">
            {title}
          </h2>

          <span>{days} d</span>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          <span>
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
