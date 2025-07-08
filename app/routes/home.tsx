import type { Route } from "./+types/home";
import { Landing } from "~/pages/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Landing to React Router!" },
  ];
}

export default function Home() {
  return <Landing />;
}
