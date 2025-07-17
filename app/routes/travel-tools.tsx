import ToolPage from "~/pages/travel/toolsPage";


// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - nombre viaje" },
		{ name: "description", content: "Nombre viaje" },
	];
}

export default function ToolPageRoutes() {
	return <ToolPage />;
}
