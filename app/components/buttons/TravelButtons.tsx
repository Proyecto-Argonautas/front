import { BaggageClaim, Bed, House, Plane, UserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const TravelButtons = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
			<Link to="/" className="flex items-center justify-center">
				<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<House className="w-6 h-6" />
				</button>
			</Link>

			<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
				<Bed className="w-6 h-6" />
			</button>

			<Link to="/travel/1/pack-list">
				<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<BaggageClaim className="w-6 h-6" />
				</button>
			</Link>

			<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
				<Plane className="w-6 h-6" />
			</button>

			<Link to="/profile">
				<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<UserRound className="w-6 h-6" />
				</button>
			</Link>
		</div>
	);
};

export default TravelButtons;
