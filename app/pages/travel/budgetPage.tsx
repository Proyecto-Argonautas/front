import React from "react";
import type { handlePages } from "~/types/navigationButtons";
import Budget from "../../components/budget/Budget";

export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "budget", content: "Nombre viaje" },
  ];
}

export const handle: handlePages = {
  buttons: ["home", "profile"],
};

const BudgetPage: React.FC = () => {
  return (
    <div>
      <Budget />
    </div>
  );
};

export default BudgetPage;
