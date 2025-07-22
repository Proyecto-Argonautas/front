
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

interface NewArticleButtonProps {
	defaultNotesArticle?: boolean;
}

export default function NewArticleButton({ defaultNotesArticle = false }: NewArticleButtonProps) {
	const [sections, setSections] = useState<Section[]>(() => {
		// Si defaultNotesArticle es true, inicializar con un artículo de notas abierto
		return defaultNotesArticle ? [{ id: 0, type: "note" }] : [];
	});
	const [showMenu, setShowMenu] = useState(false);

	const addSection = (type: SectionType) => {
		setSections((prev) => [...prev, { id: Date.now(), type }]);
		setShowMenu(false);
	};

	return (
		<div className="w-full">
			{/* Grid container para los artículos creados */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				{sections.map((section, index) => (
					<div key={section.id} className="w-full">
						{section.type === "note" && (
							<NotesArticle 
								defaultOpen={defaultNotesArticle && index === 0}
								alignment="left"
							/>
						)}
						{section.type === "flight" && <FlightArticle />}
						{section.type === "hotel" && <HotelArticleTest />}
					</div>
				))}
			</div>

			{/* Botón para añadir nueva sección */}
			<div className="relative w-full max-w-md">
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
