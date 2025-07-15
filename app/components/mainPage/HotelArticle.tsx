import { BedDouble, ChevronDown, ChevronUp, Ellipsis } from "lucide-react";
import { useState } from "react";

export default function HotelArticle() {
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
				<BedDouble />
				<h2 className="flex gap-2 text-lg font-semibold min-w-10">Hotels</h2>
				{open ? <ChevronUp /> : <ChevronDown />}
				</div>

				<Ellipsis />


			</button>
			{open && (
				<div className="border-t px-4 py-4 space-y-3 text-sm text-gray-700">
					<div className="flex justify-between">
						{/* NOMBRE DEL HOTEL*/}
						<div className="font-semibold">San Francisco Hotel</div>
					</div>

					<div className="flex justify-between text-sm">
						{/* FECHAS ENTRADA / SALIDA */}
						<div className="text-gray-600">Lun., 14 jul.</div>
						<div className="text-gray-600">Vie., 18 jul.</div>
					</div>

					<div className="text-gray-500 text-xs uppercase tracking-wide">
						{/* DIRECCION DEL HOTEL */}
						AVENIDA SAN FRANCISCO 22 05040
					</div>

					<div className="flex justify-between items-center pt-2">
						<div>
							<div className="text-xs text-gray-400 uppercase">
								Número de confirmación
							</div>

							{/* NUMERO DE RESERVA */}
							<div className="font-mono text-sm">4131314</div>
						</div>
						{/* PRECIO DE LA RESERVA */}
						<div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
							780,00 US$
						</div>
					</div>
				</div>
			)}
		</article>
	);
}
