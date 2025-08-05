import type React from "react";

function MenuBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-around items-center bg-light-primary shadow-md py-3 pb-3 md:py-2 md:pb-3 z-50 relative">
      {children}
    </div>
  );
}

export default MenuBar;
