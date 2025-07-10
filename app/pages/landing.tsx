import { Link } from "react-router";
import LandingButtons from "../components/buttons/LandingButtons";
import DestinationCard from "../components/cards/DestinationCard";

export function Landing() {
	return (
		<main className="flex flex-col gap-5 items-center justify-center pt-16 pb-4 ">
			<h1 className="font-bold">SEGUIR PLANIFICANDO</h1>
			<Link to="/travel/1" style={{ cursor: "pointer" }}>
				<DestinationCard
					image="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					title="Iceland"
				/>
			</Link>

			<h1 className="font-bold">TU PROXIMO VIAJE</h1>
			<Link to="/travel/1" style={{ cursor: "pointer" }}>
				<DestinationCard
					image="https://images.pexels.com/photos/2032332/pexels-photo-2032332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					title="Austria"
				/>
			</Link>
			<LandingButtons />
		</main>
	);
}
