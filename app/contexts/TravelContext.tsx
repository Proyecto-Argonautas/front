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
    destination: "Islandia",
    startDate: "2025-07-15",
    endDate: "2025-07-31",
    numberOfMembers: 2,
    memberNames: ["Maria", "Juan"],
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
