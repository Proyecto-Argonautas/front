import { UserRound } from "lucide-react";

import { Link } from "react-router";

const LoginButton = () => {
	return (
		 
      
			<Link to="/user/login">
					<button
						type="button"
						className="bg-gray-50 text-black outline-emerald-400 outline-2 rounded-full -outline-offset-2 p-4 shadow-lg "
					>
						<UserRound className="w-6 h-6" />
					</button>
				</Link>
		

	);
};

export default LoginButton;
