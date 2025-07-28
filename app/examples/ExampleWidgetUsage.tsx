// Ejemplo de cómo usar el WidgetBudget independientemente

import WidgetBudget from "../components/budget/WidgetBudget";
import { useBudget } from "../hooks/useBudget";

const ExampleWidgetUsage: React.FC = () => {
  const { total } = useBudget();
  
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Ejemplo de uso del Widget Budget</h2>
      
      {/* Widget básico */}
      <WidgetBudget total={150.75} />
      
      {/* Widget con moneda personalizada */}
      <WidgetBudget total={250.50} currency="€" title="Gastos del viaje" />
      
      {/* Widget conectado al estado real del presupuesto */}
      <WidgetBudget total={total} currency="€" title="Total actual" />
    </div>
  );
};

export default ExampleWidgetUsage;
