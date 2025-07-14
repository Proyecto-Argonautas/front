// import React from "react";
import { CalendarDays } from "lucide-react";

type YourTravelCardWithBackgroundProps = {
	title: string;
	startDate: string;
	endDate: string;
	avatarUrl?: string;
	backgroundImage: string;
};

const YourTravelCardWithBackground = ({
	title,
	startDate,
	endDate,
	avatarUrl,
	backgroundImage,
}: YourTravelCardWithBackgroundProps) => {
	return (
		<div className="relative w-full h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden">
			{/* Imagen de fondo */}
			<img
				src={backgroundImage}
				alt="Fondo"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			{/* Overlay opcional */}
			<div className="absolute inset-0 bg-black/30" />

			{/* Contenido encima */}
			<div className="relative h-full flex items-end p-4">
				<div className="bg-white rounded-xl p-4 shadow-lg w-full flex justify-between items-center">
					<div>
						<h2 className="text-xl font-bold text-gray-900">{title}</h2>
						<div className="flex items-center text-gray-600 mt-1 text-sm">
							<CalendarDays className="mr-2" />
							<span>
								{startDate} - {endDate}
							</span>
						</div>
					</div>

					<div className="flex items-center space-x-2">
						{avatarUrl && (
							<img
								src={avatarUrl}
								alt="Avatar"
								className="w-8 h-8 rounded-full object-cover"
							/>
						)}
						<button
							type="button"
							className="bg-gray-900 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-gray-800 mr-3"
						>
							Compartir
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YourTravelCardWithBackground;
