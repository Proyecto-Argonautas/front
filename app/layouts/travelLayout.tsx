import { Outlet } from "react-router";
import { useLocation } from "react-router";
import MenuBar from "~/components/bars/MenuBar";
import YourTravelNavBar from "~/components/bars/YourTravelNavBar";
import AddArticleButton from "~/components/buttonsComponents/AddArticleButton";

import HomeButton from "~/components/buttonsComponents/HomeButton";
import PacklistButton from "~/components/buttonsComponents/PacklistButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";

import YourTravelCardWithBackground from "~/components/cards/YourTravelCardWithBackground";

export default function TravelPage() {
	const location = useLocation();
	
	// Determinar si estamos en una ruta que requiere modo compacto
	const isCompactMode = location.pathname.includes('/itinerary') || 
						  location.pathname.includes('/tools') || 
						  location.pathname.includes('/budget')|| 
							location.pathname.includes('/packlist') ;

	return (
		<div className="flex flex-col bg-gray-100 min-h-screen gap-3 p-4 pb-25">{/* Reducido el gap de 5 a 3 */}
			<div className="bg-gray-100 min-h-screen">
				<YourTravelCardWithBackground
					title="Viaje a Islandia"
					startDate="15/7"
					endDate="31/7"
					avatarUrl="https://i.pravatar.cc/40?img=56"
					backgroundImage="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					compact={isCompactMode}
				/>

				<YourTravelNavBar />

				<Outlet />

				<MenuBar>
					<HomeButton />
					<PacklistButton />
					<AddArticleButton/>
					<ProfileButton />
				</MenuBar>
			</div>
		</div>
	);
}
