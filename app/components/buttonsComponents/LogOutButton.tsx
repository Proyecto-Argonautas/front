import { LogOut } from "lucide-react";

import { Link } from "react-router";

const LogOutButton = () => {
  return (
    <Link to="/user/login">
      <button
        className="	bg-rose-400 text-white rounded-full p-4 shadow-lg "
        type="button"
      >
        <LogOut className="w-6 h-6" />
      </button>
    </Link>
  );
};

export default LogOutButton;
