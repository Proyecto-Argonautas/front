import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import type { TravelFormData } from "~/components/forms/TravelForm";
import type { Travel } from "~/types/travel";

type TravelContextType = {
  travelData: Partial<Travel>| undefined;
  setTravelData: Dispatch<
    SetStateAction<Partial<Travel>| undefined>
  >;
  updateTravelData: (
    updates: Partial<Travel>,
  ) => void;
};

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [travelData, setTravelData] = useState<
    Partial<Travel>| undefined
  >({
    id: "1",
    destiny: "Islandia",
    startDate: "2025-08-05",
    endDate: "2025-08-22",
    companions: ["Maria", "Juan"],
  });

  const updateTravelData = (updates: Partial<Travel>) => {
    setTravelData((prev) => {
      // This assumes prev is Partial<Travel> or Travel.
      // You might need more robust merging logic if combining different structures.
      return { ...(prev as any), ...updates };
    });
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
