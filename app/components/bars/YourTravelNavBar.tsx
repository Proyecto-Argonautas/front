import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const tabs = ["Resume", "Itinerary", "Tools"];

const YourTravelNavBar = () => {
	const [activeTab, setActiveTab] = useState("Resume");

	return (
		<div className="flex items-center justify-between bg-white shadow-sm px-4">
			<div className="flex space-x-6">
				{tabs.map((tab) => (
					<NavLink
						to={`/travel/1/${tab.toLowerCase()}`}
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`py-4 font-semibold text-sm transition-all duration-200 ${
							activeTab === tab
								? "text-emerald-400 border-b-2 border-emerald-400"
								: "text-gray-600"
						}`}
					>
						{tab}
					</NavLink>
				))}
			</div>

			<div className="flex items-center space-x-4 text-gray-700 text-lg">
				<Menu />
			</div>
		</div>
	);
};

export default YourTravelNavBar;
