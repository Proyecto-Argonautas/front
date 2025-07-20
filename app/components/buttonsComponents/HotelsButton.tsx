import { Bed } from "lucide-react";

import { Link } from "react-router";

const HotelsButton = () => {
	return (
		<Link to="/">
			<button
				type="button"
				className="bg-emerald-400 text-white rounded-full p-4 shadow-lg "
			>
				<Bed className="w-6 h-6" />
			</button>
		</Link>
	);
};

export default HotelsButton;
