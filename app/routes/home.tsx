import type { Route } from "./+types/home";
import { Landing } from "~/pages/landing";
import { Travel } from "~/pages/travel";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Travels" },
    { name: "description", content: "Travels" },
  ];
}

export default function Home() {
  return <Landing />;
  return <Travel />;
}
