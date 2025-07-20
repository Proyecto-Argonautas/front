import MenuBar from "~/components/bars/MenuBar";
import HomeButton from "~/components/buttonsComponents/HomeButton";


import ProfileCard from "~/components/profile/ProfileCard";

function ProfilePage() {
	return (
		<>		
				
				<ProfileCard
					name="Albert Gonzalez"
					username="albertg"
					profileImageUrl="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					viajesCount={5}
				/>

				<MenuBar>
				<HomeButton />
				</MenuBar>

		</>

	);
}

export default ProfilePage;
