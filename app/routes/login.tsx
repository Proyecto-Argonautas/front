import LoginPage from "~/pages/loginPage";

// {}: Route.MetaArgs
export function meta() {
	return [{ title: "Login" }, { name: "resume", content: "Login" }];
}

export default function ProfileRoute() {
	return <LoginPage />;
}
