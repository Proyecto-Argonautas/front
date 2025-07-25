import { Plane } from "lucide-react";

import { Link } from "react-router";

const FlightsButton = () => {
	return (
		<Link to="/">
			<button
				type="button"
				className="bg-emerald-400 text-white rounded-full p-4 shadow-lg "
			>
				<Plane className="w-6 h-6" />
			</button>
		</Link>
	);
};

export default FlightsButton;
