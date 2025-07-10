import { Landing } from "~/pages/landing";

// {}: Route.MetaArgs
export function meta() {
	return [{ title: "Travels" }, { name: "description", content: "Travels" }];
}

export default function Home() {
	return <Landing />;
}
