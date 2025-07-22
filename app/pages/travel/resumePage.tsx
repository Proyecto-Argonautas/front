import WidgetBudget from "~/components/budget/WidgetBudget";
import NewArticleButton from "~/components/buttonsComponents/NewArticleButton";
import { useBudget } from "~/hooks/useBudget";

export default function ResumePage() {
	const { total } = useBudget();

	return (
		<div className="p-4 space-y-4">
			<div className="flex flex-col lg:flex-row gap-4">
				{/* Área principal de artículos */}
				<div className="flex-1">
					{/* Componente para gestionar todos los artículos (incluyendo el por defecto) */}
					<NewArticleButton defaultNotesArticle={true} />
				</div>
				
				{/* Sidebar derecha con el widget de presupuesto */}
				<div className="lg:w-80 lg:mt-5">
					<WidgetBudget total={total} currency="€" title="Budgeting" />
				</div>
			</div>
		</div>
	);
}
