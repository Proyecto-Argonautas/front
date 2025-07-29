import type React from "react";

function App({ children }: { children: React.ReactNode }) {
  return <div className="relative min-h-screen pb-16">{children}</div>;
}

export default App;
