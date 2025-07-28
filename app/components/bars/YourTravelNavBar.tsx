// import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";

const tabs = ["Resume", "Itinerary", "Tools", "Budget", "Packlist"];

const YourTravelNavBar = () => {
	const [activeTab, setActiveTab] = useState("Resume");
	const location = useLocation();
	
	// Determinar si estamos en Resume (no compacto) para esquinas redondeadas abajo
	const isResumeMode = location.pathname.includes('/resume') || 
						location.pathname.match(/\/travel\/\d+\/?$/);

	return (
		<>
			<style>{`
				.hide-scrollbar {
					-ms-overflow-style: none;  /* Internet Explorer 10+ */
					scrollbar-width: none;  /* Firefox */
				}
				.hide-scrollbar::-webkit-scrollbar {
					display: none;  /* Safari and Chrome */
				}
			`}</style>
			<div className={`bg-white shadow-sm -mt-3 ${
				isResumeMode ? 'rounded-xl' : 'rounded-t-xl'
			}`}>
				<div className="overflow-x-auto px-4 hide-scrollbar">
					<div className="flex space-x-6 min-w-max">
					{tabs.map((tab) => (
						<NavLink
							to={`/travel/1/${tab.toLowerCase()}`}
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`pt-5 pb-2 font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
								activeTab === tab
									? "text-emerald-400 border-b-2 border-emerald-400"
									: "text-gray-600"
							}`}
						>
							{tab}
						</NavLink>
					))}
				</div>
			</div>
		</div>
		</>
	);
};

export default YourTravelNavBar;
