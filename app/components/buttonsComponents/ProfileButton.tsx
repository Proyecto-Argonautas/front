import { UserRound } from "lucide-react";

import { Link } from "react-router";
import getUserAuthenticationStatus from "../../utils/local/user";

const ProfileButton = () => {
  let linkUrl = "/user/login";
  let buttonClass =
    "bg-gray-50 text-black outline-emerald-400 outline-2 rounded-full -outline-offset-2 p-4 shadow-lg -mt-8";

  if (getUserAuthenticationStatus()) {
    linkUrl = "/user/profile";
    buttonClass = "bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8";
  }
  return (
    <Link to={linkUrl}>
      <button className={buttonClass} type="button">
        <UserRound className="w-6 h-6" />
      </button>
    </Link>
  );
};

export default ProfileButton;
