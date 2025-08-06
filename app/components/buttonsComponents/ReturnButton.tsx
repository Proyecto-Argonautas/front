import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const ReturnButton = () => {
  let navigate = useNavigate();
  return (
    <button
      className="bg-cold-light-400 text-white rounded-full p-4 shadow-lg -mt-8"
      onClick={() => navigate(-1)}
      type="button"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
};

export default ReturnButton;
