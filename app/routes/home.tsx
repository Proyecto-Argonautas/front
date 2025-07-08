import type { Route } from "./+types/home";
import { Landing } from "~/pages/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landing Page" },
    { name: "description", content: "Landing to React Router!" },
  ];
}

export default function Home() {
  return <Landing />;
}
