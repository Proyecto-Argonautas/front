import { UserRound } from "lucide-react";

import { Link } from "react-router";

const ProfileButton = () => {
	return (
		 
      
			<Link to="/user/profile">
					<button
						type="button"
						className="bg-emerald-400 text-white rounded-full p-4 shadow-lg"
					>
						<UserRound className="w-6 h-6" />
					</button>
				</Link>
		

	);
};

export default ProfileButton;
