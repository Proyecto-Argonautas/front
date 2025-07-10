import MainForm from "~/pages/mainForm";
import type { Route } from "./+types/home";
import { Landing } from "~/pages/landing";
import { Travel } from "~/pages/travel";
import PackList from "~/pages/packList";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travels" },
    { name: "description", content: "Travels" },
  ];
}

export default function Home() {
  return <PackList />;
  return <Travel />;
  return <MainForm />;
  return <Landing />;
}
