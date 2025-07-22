import {
	ChevronDown,
	ChevronUp,
	Ellipsis,
	NotebookPen,
	Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface NotesArticleProps {
	defaultOpen?: boolean;
	alignment?: "left" | "center" | "right";
}

export default function NotesArticle({ defaultOpen = false, alignment = "center" }: NotesArticleProps) {
	const [open, setOpen] = useState(defaultOpen);
	const [note, setNote] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [visible, setVisible] = useState(true);
	const optionsRef = useRef<HTMLDivElement>(null);

	const getAlignmentClass = () => {
		switch (alignment) {
			case "left":
				return "mr-auto";
			case "right":
				return "ml-auto";
			case "center":
			default:
				return "mx-auto";
		}
	};

	// Cierra el menú si se hace clic fuera de él
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				optionsRef.current &&
				!optionsRef.current.contains(event.target as Node)
			) {
				setShowOptions(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	if (!visible) return null; // No renderizar si está "eliminado"

	return (
		<article className={`relative w-full ${getAlignmentClass()} mt-5 bg-white rounded-2xl shadow-md`}>
			<button
				type="button"
				className="flex items-center w-full p-4 cursor-pointer bg-transparent border-0 outline-none"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-controls="notes-article-content"
			>
				<div className="flex items-center gap-2 mr-auto">
					<NotebookPen />
					<h2 className="flex gap-2 text-lg font-semibold min-w-10">Notes </h2>
					{open ? <ChevronUp /> : <ChevronDown />}
				</div>
			</button>

			<div className="absolute top-4 right-4" ref={optionsRef}>
				<button
					type="button"
					onClick={() => setShowOptions((prev) => !prev)}
					className="p-1"
				>
					<Ellipsis />
				</button>
				{showOptions && (
					<div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
						<button
							type="button"
							onClick={() => setVisible(false)}
							className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
						>
							<Trash2 size={16} />
							Eliminar
						</button>
					</div>
				)}
			</div>

			{open && (
				<div id="notes-article-content" className="border-t px-4 py-4">
					<textarea
						className="w-full h-32 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Escribe tus notas aquí..."
						value={note}
						onChange={(e) => setNote(e.target.value)}
					/>
				</div>
			)}
		</article>
	);
}
