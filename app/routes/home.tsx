import { LandingPage } from "~/pages/landingPage";

// {}: Route.MetaArgs
export function meta() {
	return [{ title: "Travels" }, { name: "resume", content: "Travels" }];
}

export default function Home() {
	return <LandingPage />;
}
