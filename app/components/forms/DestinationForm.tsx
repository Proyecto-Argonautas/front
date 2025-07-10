import { useState } from "react";

export function DestinationForm() {
	const [destination, setDestination] = useState("");

	return (
		<div className="border rounded-xl p-4 w-full max-w-xl">
			<label className="block text-gray-800 font-semibold mb-1">
				¿A dónde?
				<span className="text-gray-500 font-normal ml-2">
					p. ej., París, Hawái, Japón
				</span>
			</label>
			<input
				type="text"
				className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Ingresa un destino"
				value={destination}
				onChange={(e) => setDestination(e.target.value)}
			/>
		</div>
	);
}
