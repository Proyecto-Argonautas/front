import { CalendarDays } from "lucide-react";

type YourTravelCardWithBackgroundProps = {
  title: string;
  startDate: string;
  endDate: string;
  participants?: number;
  backgroundImage: string;
  compact?: boolean;
};

const YourTravelCardWithBackground = ({
  title,
  startDate,
  endDate,
  participants = 1,
  backgroundImage,
  compact = false,
}: YourTravelCardWithBackgroundProps) => {
  if (compact) {
    return (
      <div className="relative w-full transition-[height,opacity] duration-100 ease-in-out h-32 sm:h-48 overflow-hidden">
        {/* Imagen de fondo */}
        <img
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ease-in-out"
          src={backgroundImage}
        />

        <div className="absolute inset-0 bg-black/25 transition-opacity duration-100 ease-in-out" />

        <div className="relative h-full flex items-end justify-center transition-all duration-500 ease-out p-4 pb-3">
          <div className="bg-light-primary/95 backdrop-blur-sm rounded-lg shadow-sm w-full flex justify-between items-center transition-all duration-500 ease-out p-3">
            <div>
              <h2 className="font-bold text-gray-900 transition-[font-size,line-height] duration-100 ease-in-out text-lg">
                {title}
              </h2>
              <div className="flex items-center text-gray-600 mt-1 transition-[font-size,margin-top] duration-100 ease-in-out text-sm">
                <CalendarDays className="mr-2 transition-[width,height] duration-100 ease-in-out w-4 h-4" />
                <span>
                  {startDate} - {endDate}
                </span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 text-sm font-medium">
              <span>{participants} participante{participants !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full transition-[height,opacity] duration-100 ease-in-out h-48 md:h-56 lg:h-64 overflow-hidden">
      {/* Imagen de fondo */}
      <img
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ease-in-out"
        src={backgroundImage}
      />

      <div className="absolute inset-0 bg-black/30 transition-opacity duration-100 ease-in-out" />

      <div className="relative h-full flex items-end transition-all duration-500 ease-out p-4">
        <div className="bg-light-primary shadow-lg w-full flex justify-between items-center transition-all duration-500 ease-out rounded-xl p-4">
          <div>
            <h2 className="font-bold text-gray-900 transition-[font-size,line-height] duration-100 ease-in-out text-xl">
              {title}
            </h2>
            <div className="flex items-center text-gray-600 mt-1 transition-[font-size,margin-top] duration-100 ease-in-out text-sm">
              <CalendarDays className="mr-2 transition-[width,height] duration-100 ease-in-out w-5 h-5" />
              <span>
                {startDate} - {endDate}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 text-sm font-medium">
            <span>{participants} participante{participants !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourTravelCardWithBackground;
