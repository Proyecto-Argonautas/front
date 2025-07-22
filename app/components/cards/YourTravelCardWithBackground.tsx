// import React from "react";
import { CalendarDays } from "lucide-react";

type YourTravelCardWithBackgroundProps = {
	title: string;
	startDate: string;
	endDate: string;
	avatarUrl?: string;
	backgroundImage: string;
	compact?: boolean;
};

const YourTravelCardWithBackground = ({
	title,
	startDate,
	endDate,
	avatarUrl,
	backgroundImage,
	compact = false,
}: YourTravelCardWithBackgroundProps) => {
	// Si está en modo compacto, mostrar una versión reducida con imagen de fondo
	if (compact) {
		return (
			<div className="relative w-full h-32 rounded-t-xl overflow-hidden">
				{/* Imagen de fondo */}
				<img
					src={backgroundImage}
					alt="Fondo"
					className="absolute inset-0 w-full h-full object-cover"
				/>

				{/* Overlay más sutil */}
				<div className="absolute inset-0 bg-black/25" />

				{/* Contenido encima - posicionado en la parte inferior para mostrar más imagen arriba */}
				<div className="relative h-full flex items-end p-4">
					<div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm w-full flex justify-between items-center">
						<div>
							<h2 className="text-lg font-bold text-gray-900">{title}</h2>
							<div className="flex items-center text-gray-600 mt-1 text-sm">
								<CalendarDays className="mr-2 w-4 h-4" />
								<span>
									{startDate} - {endDate}
								</span>
							</div>
						</div>
						{avatarUrl && (
							<img
								src={avatarUrl}
								alt="Avatar"
								className="w-8 h-8 rounded-full object-cover"
							/>
						)}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative w-full h-48 md:h-56 lg:h-64 rounded-t-xl overflow-hidden">{/* Reducido la altura y solo esquinas superiores redondeadas */}
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
