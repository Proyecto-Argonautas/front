import {  LogOut, Plus, Search, UserRound } from "lucide-react";
import { Link } from "react-router";

const MainMenuBar = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
			<Link to="/">
				<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<Search className="w-6 h-6" />
				</button>
			</Link>

			<Link to="/travel/create">
				<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<Plus className="w-6 h-6" />
				</button>
			</Link>

			<Link to="/user/profile">
				<button className="bg-gray-50 text-black outline-emerald-400 outline-2 rounded-full -outline-offset-2
				 p-4 shadow-lg -mt-8">
					<UserRound className="w-6 h-6" />
				</button>
			</Link>

			
		</div>
	);
};

export default MainMenuBar;
