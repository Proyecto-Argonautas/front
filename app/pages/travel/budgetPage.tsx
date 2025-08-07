import React from "react";
import { type LoaderFunctionArgs, redirect } from "react-router";
import { getTravels } from "~/services/getTravel";
import { getUserAsync, isUserAuthenticated } from "~/services/getUser";
import type { handlePages } from "~/types/navigationButtons";
import Budget from "../../components/budget/Budget";

export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "budget", content: "Nombre viaje" },
  ];
}

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const travelId = params.travelId;

  if (!(await isUserAuthenticated())) {
    return redirect("/user/login");
  }

  const user = await getUserAsync(); // Fetch the user
  const userId = user?.id; // Get the user ID
  const travels = await getTravels(userId); // Fetch travels using the user ID\

  const travelExists = travels?.some((travel) => travel.id === travelId);

  if (!travelExists) {
    return redirect("/"); // Redirect to root if no travels exist
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
