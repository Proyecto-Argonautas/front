import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <main className="relative min-h-screen pb-16">
      <Outlet />
    </main>
  );
}
