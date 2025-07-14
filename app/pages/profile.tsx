import ProfileButtons from "~/components/buttons/ProfileButtons";
import Profile from "~/components/profile/profile";

function ProfilePage() {
	return (
		<>
			<Profile
				name="Albert Gonzalez"
				email="ureña@chuleta@gmail.com"
				avatarUrl="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			/>
			;
			<ProfileButtons />
		</>
	);
}

export default ProfilePage;
