import { useState } from "react";

export function DateForm() {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	return (
		<div className=" rounded-xl p-4 w-full max-w-xl">
			<label
				className="block font-semibold text-gray-800 mb-2"
				htmlFor="start-date"
			>
				Fechas <span className="text-gray-500">(opcional)</span>
			</label>
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex items-center gap-2">
					<svg
						className="w-5 h-5 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Calendario</title>
						<title>Calendario</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<input
						id="start-date"
						type="date"
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						placeholder="Fecha de inicio"
					/>
				</div>

				{/* Fecha de finalización */}
				<div className="flex items-center gap-2 w-full">
					<svg
						className="w-5 h-5 text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Calendario</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<input
						type="date"
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						placeholder="Fecha de finalización"
					/>
				</div>
			</div>
		</div>
	);
}
