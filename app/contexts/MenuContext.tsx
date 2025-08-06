import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

interface MenuContextType {
  isAddArticleMenuOpen: boolean;
  setIsAddArticleMenuOpen: (isOpen: boolean) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isAddArticleMenuOpen, setIsAddArticleMenuOpen] = useState(false);

  return (
    <MenuContext.Provider
      value={{ isAddArticleMenuOpen, setIsAddArticleMenuOpen }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
