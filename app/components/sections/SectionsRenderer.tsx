import { useSections } from "~/contexts/SectionsContext";
import FlightArticle from "../mainPage/FlightsArticle";
import HotelArticleTest from "../mainPage/HotelArticle";
import NotesArticle from "../mainPage/NotesArticle";
import CurrencyArticle from "../mainPage/CurrencyArticle";

export default function SectionsRenderer() {
	const { sections } = useSections();

	if (sections.length === 0) return null;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-1">
			{sections.map((section) => (
				<div key={section.id} className="w-full">
					{section.type === "note" && (
						<NotesArticle 
							defaultOpen={false}
							alignment="left"
						/>
					)}
					{section.type === "flight" && <FlightArticle />}
					{section.type === "hotel" && <HotelArticleTest />}
					{section.type === "currency" && <CurrencyArticle />}
				</div>
			))}
		</div>
	);
}
