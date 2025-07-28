import { House } from "lucide-react";

import { Link } from "react-router";

const HomeButton = () => {
  return (
    <Link to="/">
      <button
        className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8 "
        type="button"
      >
        <House className="w-6 h-6" />
      </button>
    </Link>
  );
};

export default HomeButton;
