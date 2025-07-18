import PackListPage from "~/pages/packList";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "resume", content: "pack list viaje" },
	];
}

export default function PackListRoute() {
	return <PackListPage />;
}
