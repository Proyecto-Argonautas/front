import React from "react";
import { redirect } from "react-router";
import { isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";
import Budget from "../../components/budget/Budget";

export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "budget", content: "Nombre viaje" },
  ];
}

export async function clientLoader() {
  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }
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
