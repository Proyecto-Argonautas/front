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
      <WidgetBudget currency="€" title="Gastos del viaje" total={250.5} />

      {/* Widget conectado al estado real del presupuesto */}
      <WidgetBudget currency="€" title="Total actual" total={total} />
    </div>
  );
};

export default ExampleWidgetUsage;
