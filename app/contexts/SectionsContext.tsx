import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

type SectionType = "note" | "flight" | "hotel" | "currency" | "weather" | "translate";

interface Section {
  id: number;
  type: SectionType;
}

interface SectionsContextType {
  sections: Section[];
  addSection: (type: SectionType) => void;
  removeSection: (id: number) => void;
  clearSections: () => void;
}

const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined,
);

export function SectionsProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = (type: SectionType) => {
    setSections((prev) => [...prev, { id: Date.now(), type }]);
  };

  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const clearSections = () => {
    setSections([]);
  };

  return (
    <SectionsContext.Provider
      value={{ sections, addSection, removeSection, clearSections }}
    >
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  const context = useContext(SectionsContext);
  if (context === undefined) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
}
