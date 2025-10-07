import React from "react";

const StatsCard = ({ number, label, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-yellow-400">
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
        {number}
      </div>
      <div className="text-gray-700 text-sm md:text-base font-medium">
        {label}
      </div>
    </div>
  );
};

export default StatsCard;
