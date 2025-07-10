import MainForm from "~/pages/mainForm";
import type { Route } from "./+types/home";
import { Landing } from "~/pages/landing";
import { Travel } from "~/pages/travel";
import PackList from "~/pages/packList";



// Ejemplo error "{}: Route.MetaArgs"
export function meta() {
  return [
    { title: "Travels" },
    { name: "description", content: "Travels" },
  ];
}

export default function Home() {
  return <Landing />;
  return <MainForm />;
  return <Travel />;
  return <PackList />;
}
