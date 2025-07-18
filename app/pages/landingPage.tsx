import { Link } from "react-router";
import MenuBar from "~/components/bars/MenuBar";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import SearchButton from "~/components/buttonsComponents/SearchButton";
import DestinationCard from "../components/cards/DestinationCard";

export function LandingPage() {
	return (
		<main className="flex bg-gray-100 flex-col gap-5 items-center justify-center pt-6 pb-25">
			<h1 className="font-bold">SEGUIR PLANIFICANDO</h1>
			<Link to="/travel/1/description" style={{ cursor: "pointer" }}>
				<DestinationCard
					image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					title="Iceland"
					members={2}
					startDate="2024/08/01"
					endDate="2024/08/10"
				/>
			</Link>

			<h1 className="font-bold">TUS PROXIMOS VIAJES</h1>

			<div className="flex flex-col gap-4">
				<Link to="/travel/1/description" style={{ cursor: "pointer" }}>
					<DestinationCard
						image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						title="Austria"
						members={1}
						startDate="2024/07/01"
						endDate="2024/07/10"
					/>
				</Link>
				<Link to="/travel/1/description" style={{ cursor: "pointer" }}>
					<DestinationCard
						image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						title="Austria"
						members={1}
						startDate="2024/07/01"
						endDate="2024/07/10"
					/>
				</Link>
			</div>

			<MenuBar>
				<SearchButton />
				<CreateButton />

				<ProfileButton />
			</MenuBar>
		</main>
	);
}
