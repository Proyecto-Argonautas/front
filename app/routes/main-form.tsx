import MainFormPage from "~/pages/mainFormPage";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "Travels - Main Form" },
		{ name: "resume", content: "Form create travels" },
	];
}

export default function MainFormRoute() {
	return <MainFormPage />;
}
