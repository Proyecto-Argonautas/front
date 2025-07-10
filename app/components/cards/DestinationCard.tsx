import type React from "react";

interface DestinationCardProps {
	image: string;
	title: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ image, title }) => {
	return (
		<div className="w-64 rounded-xl overflow-hidden shadow-md bg-white">
			<img src={image} alt={title} className="w-full h-38 object-cover" />
			<div className="p-4 text-center">
				<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
			</div>
		</div>
	);
};

export default DestinationCard;
