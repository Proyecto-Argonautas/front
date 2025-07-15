import { ChevronLeft, House, UserRound } from "lucide-react";

import { Link } from "react-router";

const PacklistButtons = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
			<Link to="/">
				<button type="button" className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<House className="w-6 h-6" />
				</button>
			</Link>

			<Link to='..'>
				<button type="button" className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<ChevronLeft className="w-6 h-6" />
				</button>
			</Link>

			<Link to="/user/profile">
				<button type="button" className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<UserRound className="w-6 h-6" />
				</button>
			</Link>
		</div>
	);
};

export default PacklistButtons;
