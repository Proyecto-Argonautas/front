import DescriptionPage from "~/pages/travel/descriptionPage";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "description", content: "Nombre viaje" },
	];
}

export default function TravelPageRoutes() {
	return <DescriptionPage />;
}
