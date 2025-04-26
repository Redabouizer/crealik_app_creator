import React from 'react';

function ChartContainer({ title, children, className = '' }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm ${className}`}>
      <h3 className="text-gray-700 font-medium mb-4">{title}</h3>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default ChartContainer;