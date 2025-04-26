import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StatCard({ title, value, icon, change, className = '' }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div className="flex flex-col">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {change && (
          <div className="flex items-center mt-2">
            <span 
              className={`inline-flex items-center ${
                change.isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {change.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="ml-1 text-sm">
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
            </span>
            <span className="text-gray-500 text-xs ml-2">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;