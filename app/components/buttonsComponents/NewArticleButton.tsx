// components/NewArticleButton.tsx
import { BedDouble, NotebookPen, PlaneTakeoff } from "lucide-react";
import { useState } from "react";
import FlightArticle from "../mainPage/FlightsArticle";
import HotelArticleTest from "../mainPage/HotelArticle";
import NotesArticle from "../mainPage/NotesArticle";

type SectionType = "note" | "flight" | "hotel";

interface Section {
	id: number;
	type: SectionType;
}

export default function NewArticleButton() {
	const [sections, setSections] = useState<Section[]>([]);
	const [showMenu, setShowMenu] = useState(false);

	const addSection = (type: SectionType) => {
		setSections((prev) => [...prev, { id: Date.now(), type }]);
		setShowMenu(false);
	};

	return (
		<div className="flex flex-col w-full max-w-md ">
			{sections.map((section) => (
				<div key={section.id}>
					{section.type === "note" && <NotesArticle />}
					{section.type === "flight" && <FlightArticle />}
					{section.type === "hotel" && <HotelArticleTest />}
				</div>
			))}

			<div className="relative ">
				<button
					type="button"
					onClick={() => setShowMenu((prev) => !prev)}
					className="w-full mt-3 py-2 px-4 bg-emerald-400 hover:bg-emerald-700 text-white rounded-2xl shadow font-semibold transition"
				>
					+ Añadir nueva sección
				</button>

				{showMenu && (
					<div className=" flex absolute z-10 w-full bg-white p-3 mt-2 rounded-2xl shadow-lg overflow-hidden">
						<button
							type="button"
							onClick={() => addSection("note")}
							className="flex  gap-1 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
						>
							<NotebookPen /> Nota
						</button>
						<button
							type="button"
							onClick={() => addSection("flight")}
							className="flex gap-1 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
						>
							<PlaneTakeoff /> Vuelo
						</button>
						<button
							type="button"
							onClick={() => addSection("hotel")}
							className="flex gap-1 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
						>
							<BedDouble /> Hotel
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
