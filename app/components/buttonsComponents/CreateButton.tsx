import { Plus } from "lucide-react";

import { Link } from "react-router";

const CreateButton = () => {
	return (
	
      
			<Link to="/travel/create">
				<button
					type="button"
					className="bg-emerald-400 text-white rounded-full p-4 shadow-lg "
				>
					<Plus className="w-6 h-6" />
				</button>
			</Link>
		

	);
};

export default CreateButton;
