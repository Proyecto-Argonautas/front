import { Test } from "~/pages/test";

export function meta() {
  return [
    { title: "Esto es una prueba2" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Test />;
}
