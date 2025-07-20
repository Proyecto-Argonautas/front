import ItineraryPage from "~/pages/travel/itineraryPage";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "resume", content: "Nombre viaje" },
	];
}

export default function ItineraryPageRoutes() {
	return <ItineraryPage />;
}
