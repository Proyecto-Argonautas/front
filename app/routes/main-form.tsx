import MainForm from "~/pages/mainForm";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - Main Form" },
		{ name: "description", content: "Form create travels" },
	];
}

export default function Home() {
	return <MainForm />;
}
