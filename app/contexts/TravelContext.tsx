import React, { createContext, useContext, useState } from "react";
import type { TravelFormData } from "~/components/forms/TravelForm";

type TravelContextType = {
  travelData: Partial<TravelFormData>;
  setTravelData: (data: Partial<TravelFormData>) => void;
  updateTravelData: (updates: Partial<TravelFormData>) => void;
};

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [travelData, setTravelData] = useState<Partial<TravelFormData>>({
    destiny: "Islandia",
    startDate: "2025-08-05",
    endDate: "2025-08-22",
    companions: ["Maria", "Juan"],
  });

  const updateTravelData = (updates: Partial<TravelFormData>) => {
    setTravelData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <TravelContext.Provider
      value={{ travelData, setTravelData, updateTravelData }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = (): TravelContextType => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
};
