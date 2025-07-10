import PackList from "~/pages/packList";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "description", content: "pack list viaje" },
	];
}

export default function Home() {
	return <PackList />;
}
