import { Plus } from "lucide-react";

const AddArticleButton = () => {
  return (
    <button
      className="bg-emerald-400 text-white rounded-full p-4 shadow-lg -mt-8 "
      type="button"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default AddArticleButton;
