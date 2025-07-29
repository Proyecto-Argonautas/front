export function meta() {
  return [
    { title: "Travels - nombre viaje" },
    { name: "budget", content: "Nombre viaje" },
  ];
}


import Budget from "../../components/budget/Budget";

const BudgetPage: React.FC = () => {
  return (
    <div>
      <Budget />
    </div>
  );
};

export default BudgetPage;
