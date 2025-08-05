import { Ellipsis, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface WidgetBudgetProps {
  total: number;
  currency?: string;
  title?: string;
  onRemove?: () => void;
  showRemoveOption?: boolean;
}

const WidgetBudget: React.FC<WidgetBudgetProps> = ({
  total,
  currency = "US$",
  title = "Budgeting",
  onRemove,
  showRemoveOption = false,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-light-primary rounded-lg p-4 shadow-sm border border-gray-200 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {showRemoveOption && (
          <div className="relative">
            <button
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowMenu(!showMenu)}
              type="button"
            >
              <Ellipsis className="w-4 h-4 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-light-primary border rounded-md shadow-md z-10">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-light-secondary-100"
                  onClick={() => {
                    onRemove?.();
                    setShowMenu(false);
                  }}
                  type="button"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-600 mb-1">
        {total.toFixed(2)} {currency}
      </div>
    </div>
  );
};

export default WidgetBudget;
