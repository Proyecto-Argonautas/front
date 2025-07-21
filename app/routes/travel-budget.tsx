import BudgetPage from "~/pages/travel/budgetPage";


// {}: Route.MetaArgs
export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "budget", content: "Nombre viaje" },
  ];
}

export default function BudgetPageRoutes() {
  return <BudgetPage />;
}
