import ResumePage from "~/pages/travel/resumePage";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "resume", content: "Nombre viaje" },
	];
}

export default function TravelPageRoutes() {
	return <ResumePage />;
}
