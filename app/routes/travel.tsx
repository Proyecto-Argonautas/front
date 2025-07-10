import Travel from "~/pages/travel";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "description", content: "Nombre viaje" },
	];
}

export default function Home() {
	return <Travel />;
}
