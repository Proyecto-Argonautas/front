import { House, UserRound } from "lucide-react";
import React from "react";

const FormButtons = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
			<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
				<House className="w-6 h-6" />
			</button>

			<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
				<UserRound className="w-6 h-6" />
			</button>
		</div>
	);
};

export default FormButtons;
