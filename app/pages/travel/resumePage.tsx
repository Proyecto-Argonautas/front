import WidgetBudget from "~/components/budget/WidgetBudget";
import NewArticleButton from "~/components/buttonsComponents/NewArticleButton";
import { useBudget } from "~/hooks/useBudget";

export default function ResumePage() {
	const { total } = useBudget();

	return (
		<div className="p-4 space-y-4">
			<NewArticleButton />
			<WidgetBudget total={total} currency="€" title="Budgeting" />
		</div>
	);
}
