import MenuBar from "~/components/bars/MenuBar";
import LoginCard from "../components/login/LoginCard";
import HomeButton from "~/components/buttonsComponents/HomeButton";
import ReturnButton from "~/components/buttonsComponents/ReturnButton";

function LoginPage() {
	return (
		<>
			<LoginCard />

			{/* RegisterMessage */}

			<MenuBar>
				<HomeButton />
				<ReturnButton />
			</MenuBar>
		</>
	);
}

export default LoginPage;
