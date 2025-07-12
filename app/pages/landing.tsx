import { Link } from "react-router";
import LandingButtons from "../components/buttons/LandingButtons";
import DestinationCard from "../components/cards/DestinationCard";

export function LandingPage() {
	return (
		<main className="flex flex-col gap-5 items-center justify-center pt-6 pb-4 ">
			<h1 className="font-bold">SEGUIR PLANIFICANDO</h1>
			<Link to="/travel/1" style={{ cursor: "pointer" }}>
				<DestinationCard
					image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					title="Iceland"
					members={2}
					startDate="2024/08/01"
					endDate="2024/08/10"
				/>
			</Link>

			<h1 className="font-bold">TU PROXIMO VIAJE</h1>
			
			<div className="mb-15">
				<Link to="/travel/1" style={{ cursor: "pointer" }}>
					<DestinationCard
						image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
						title="Austria"
						members={1}
						startDate="2024/07/01"
						endDate="2024/07/10"
					/>
				</Link>
			</div>
			<LandingButtons />
		</main>
	);
}
