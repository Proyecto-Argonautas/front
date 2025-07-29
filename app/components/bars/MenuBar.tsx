import type React from "react";

function MenuBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 pb-3 md:py-2 md:pb-3 z-50 ">
      {children}
    </div>
  );
}

export default MenuBar;
