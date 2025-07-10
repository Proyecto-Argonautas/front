import { Landing } from "~/pages/landing";
import MainForm from "~/pages/mainForm";
import PackList from "~/pages/packList";
import { Travel } from "~/pages/travel";

// {}: Route.MetaArgs
export function meta() {
	return [{ title: "Travels" }, { name: "description", content: "Travels" }];
}

export default function Home() {
	return <Landing />;
	return <MainForm />;
	return <Travel />;
	return <PackList />;
}
