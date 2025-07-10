import { House } from "lucide-react";
import { Link } from "react-router";

const ProfileButtons = () => {
	return (
		<div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-white shadow-md py-3 z-50">
			<Link to="/" className="flex items-center justify-center">
				<button className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8">
					<House className="w-6 h-6" />
				</button>
			</Link>
		</div>
	);
};

export default ProfileButtons;
