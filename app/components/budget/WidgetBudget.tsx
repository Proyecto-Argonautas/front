import React from 'react';

interface WidgetBudgetProps {
  total: number;
  currency?: string;
  title?: string;
}

const WidgetBudget: React.FC<WidgetBudgetProps> = ({ 
  total, 
  currency = "US$", 
  title = "Budgeting" 
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 max-w-xs">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <div className="text-2xl font-bold text-gray-600 mb-1">
        {total.toFixed(2)} {currency}
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
        View details
      </button>
    </div>
  );
};

export default WidgetBudget;
