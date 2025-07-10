import ProfilePage from "~/pages/profile";

// {}: Route.MetaArgs
export function meta() {
	return [
		{ title: "User Profile" },
		{ name: "description", content: "User profile" },
	];
}

export default function ProfileRoute() {
	return <ProfilePage />;
}
