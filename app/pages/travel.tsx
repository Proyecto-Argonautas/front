import YourTravelNavBar from "~/components/bars/YourTravelNavBar";
import TravelButtons from "~/components/buttons/TravelButtons";
import YourTravelCardWithBackground from "~/components/cards/YourTravelCardWithBackground";

export default function Travel() {
	return (
		<div className="flex flex-col bg-gray-100 min-h-screen gap-5 p-4">
			<div className="bg-gray-100 min-h-screen">
				<YourTravelCardWithBackground
					title="Viaje a Islandia"
					startDate="15/7"
					endDate="31/7"
					avatarUrl="https://i.pravatar.cc/40?img=56"
					backgroundImage="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				/>

				<YourTravelNavBar />

				{/* CONTENIDOOOOOOOOOOOOOOOOOOOOOOOOOO */}

				<TravelButtons />
			</div>
		</div>
	);
}
