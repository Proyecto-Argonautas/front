import React from "react";
import FormButtons from "~/components/buttons/FormButtons";
import StartPlanning from "~/components/buttons/StartPlanningButton";
import { DestinationForm } from "~/components/forms/DestinationForm";
import { DateForm } from "../components/forms/DateForm"; // Ajusta la ruta si tu estructura de carpetas es diferente

export default function MainFormPage() {
	return (
		<div className="flex flex-col gap-5 min-h-screen bg-gray-50 p-6">
			<div className="flex flex-col gap-5 max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					ELIGE TU DESTINO
				</h1>

				{/* lugar de destino */}
				<DestinationForm />

				{/* fechas */}
				<DateForm />
			</div>

			<StartPlanning />
			<FormButtons />
		</div>
	);
}
