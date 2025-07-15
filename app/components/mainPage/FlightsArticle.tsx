import { ChevronDown, ChevronUp, Ellipsis, PlaneTakeoff } from "lucide-react";
import { useState } from "react";

export default function FlightArticle() {
	const [open, setOpen] = useState(false);

	return (
		<article className="w-full max-w-md mx-auto mt-5 bg-white rounded-2xl shadow-md">
			<button
				type="button"
				className="flex items-center justify-between w-full p-4 cursor-pointer bg-transparent border-0 rounded-t-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-controls="article-details"
			>
				<div className="flex items-center gap-2 mr-auto">
				<PlaneTakeoff />
				<h2 className="flex gap-2 text-lg font-semibold min-w-10">Flights</h2>
				{open ? <ChevronUp /> : <ChevronDown />}
				</div>

				<Ellipsis />

			</button>
			{open && (
				<div className="border-t px-4 py-4 space-y-3 text-sm text-gray-700">
					<div className="flex justify-between">
						<div>
							{/* DIMINUTIVO ORIGEN */}
							<div className="text-xs text-gray-500">SFO</div>
							{/* NOMBRE ORIGEN */}
							<div className="font-semibold">San Francisco</div>
						</div>
						<div className="text-center self-center text-gray-400 text-sm">
							→
						</div>
						<div className="text-right">
							{/* DIMINUTIVO DESTINO */}
							<div className="text-xs text-gray-500">EWR</div>
							{/* NOMBRE DESTINO */}
							<div className="font-semibold">Newark</div>
						</div>
					</div>

					<div className="flex justify-between text-sm">
						{/* FECHA DE SALIDA */}
						<div className="text-gray-600">Lun., 14 jul.</div>
						{/* HORA DE SALIDA / HORA DE LLEGADA */}
						<div className="text-gray-600">6:30 — 15:04</div>
					</div>

					{/* COMPAÑIA AEREA */}
					<div className="text-gray-500 text-xs uppercase tracking-wide">
						United Airlines UA 295
					</div>

					<div className="flex justify-between items-center pt-2">
						<div>
							<div className="text-xs text-gray-400 uppercase">
								Número de reserva
							</div>
							{/* NUMERO DE RESERVA */}
							<div className="font-mono text-sm">4131314</div>
						</div>
						{/* PRECIO DEL VUELO */}
						<div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
							78,00 US$
						</div>
					</div>
				</div>
			)}
		</article>
	);
}
