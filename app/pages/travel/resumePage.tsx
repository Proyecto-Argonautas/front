import WidgetBudget from "~/components/budget/WidgetBudget";
import SectionsRenderer from "~/components/sections/SectionsRenderer";
import { useBudget } from "~/hooks/useBudget";

export default function ResumePage() {
	const { total } = useBudget();

	return (
		<div className="p-4 space-y-4">
			<div className="flex flex-col lg:flex-row gap-4">
				{/* Columna izquierda - Secciones */}
				<div className="flex-1">
					<SectionsRenderer />
				</div>
				
				{/* Columna derecha - Budget */}
				<div className="lg:w-80 lg:mt-5">
					<WidgetBudget total={total} currency="€" title="Budgeting" />
				</div>
			</div>
		</div>
	);
}
