import type { Route } from "./+types/home";
import { Landing } from "~/pages/landing";
import { Travel } from "~/pages/travel";



export function meta({}: Route.MetaArgs) {
  return [
<<<<<<< HEAD
    { title: "Travels" },
    { name: "description", content: "Travels" },
=======
    { title: "Landing Page" },
    { name: "description", content: "Landing to React Router!" },
>>>>>>> 97bc847e5a9e1e54ab3de352f99c3803cf7c48c7
  ];
}

export default function Home() {
  return <Landing />;
  return <Travel />;
}
