import LoginPage from "~/pages/login";

// {}: Route.MetaArgs
export function meta() {
	return [{ title: "Login" }, { name: "description", content: "Login" }];
}

export default function ProfileRoute() {
	return <LoginPage />;
}
