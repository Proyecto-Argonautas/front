import { BaggageClaim } from "lucide-react";

import { Link } from "react-router";

const PacklistButton = () => {
	return (
		 
      
			<Link to="/travel/1/pack-list">
				<button
					type="button"
					className="bg-emerald-400 text-white rounded-full p-4 shadow-lg "
				>
					<BaggageClaim className="w-6 h-6" />
				</button>
			</Link>
		

	);
};

export default PacklistButton;
