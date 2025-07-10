import Profile from "~/components/profile/profile";
import ProfileButtons from "~/components/buttons/ProfileButtons";

function App() {
	return (
		<>
			<Profile
				name="John Doe"
				email="john.doe@example.com"
				avatarUrl="https://example.com/avatar.jpg"
			/>
			;
			<ProfileButtons />
		</>
	);
}

export default App;
