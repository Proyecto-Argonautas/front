import { UserRound } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "~/contexts/UserContext";

function ProfileButton() {
  let linkUrl = "/user/login";
  let buttonClass =
    "bg-light-secondary-50 text-black outline-emerald-400 outline-2 rounded-full -outline-offset-2 p-4 shadow-lg -mt-8";

  const user = useContext(UserContext);

  if (user) {
    linkUrl = "/user/profile";
    buttonClass =
      "bg-cold-light-400 text-white rounded-full p-4 shadow-lg -mt-8";
    if (user.image)
      buttonClass += ` bg-[image:var(--img-url)] bg-cover bg-center bg-no-repeat`;
  }

  return (
    <Link to={linkUrl}>
      <button
        className={buttonClass}
        style={{ "--img-url": `url(${user?.image})` } as React.CSSProperties}
        type="button"
      >
        {user?.image ? (
          <div className="w-6 h-6" />
        ) : (
          <UserRound className="w-6 h-6" />
        )}
      </button>
    </Link>
  );
}

export default ProfileButton;
