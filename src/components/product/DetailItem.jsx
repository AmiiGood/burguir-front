import React from "react";

const DetailItem = ({
  icon: Icon,
  label,
  value,
  colorClass = "text-indigo-400",
}) => (
  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
    <Icon size={24} className={colorClass} />
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);

export default DetailItem;
