// import ProfileButtons from "~/components/buttons/ProfileButtons";
import CreateButton from "~/components/buttonsComponents/CreateButton";
import FlightsButton from "~/components/buttonsComponents/FlightsButton";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import HotelsButton from "~/components/buttonsComponents/HotelsButton";
import LoginButton from "~/components/buttonsComponents/LoginButton";
import LogOutButton from "~/components/buttonsComponents/LogOutButton";
import PacklistButton from "~/components/buttonsComponents/PacklistButton";
import ProfileButton from "~/components/buttonsComponents/ProfileButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";


import Profile from "~/components/profile/profile";

function ProfilePage() {
	return (
		<>
			<div className="flex flex-col gap-5 items-center justify-center mt-10 pt-6">
				<h1 className="font-bold text-2xl">TU PERFIL</h1>
				<Profile
					name="Albert Gonzalez"
					email="ureña@chuleta@gmail.com"
					avatarUrl="https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
				/>
			</div>
			
			{/* <ProfileButtons /> */}

			<div className="fixed bottom-0 left-0 w-full justify-around items-center bg-white shadow-md py-3 z-50 flex">
				
				<HomeButton />
			</div>

		</>
	);
}

export default ProfilePage;
