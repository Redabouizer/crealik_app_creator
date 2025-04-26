import React from 'react';
import { CalendarDays, DollarSign } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  inProgress: 'bg-blue-100 text-blue-800',
  review: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'Pending',
  inProgress: 'In Progress',
  review: 'Under Review',
  completed: 'Completed',
  rejected: 'Rejected'
};

function MissionCard({ title, brand, status, deadline, budget, onClick }) {
  const deadlineDate = new Date(deadline);
  const isOverdue = deadlineDate < new Date() && status !== 'completed';
  const formattedDate = deadlineDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {brand.photoURL ? (
            <img src={brand.photoURL} alt={brand.name} className="w-8 h-8 rounded-full mr-2" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-gray-500">
              {brand.name.charAt(0)}
            </div>
          )}
          <span className="text-sm text-gray-600">{brand.name}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      
      <h3 className="text-base font-medium text-gray-800 mb-3">{title}</h3>
      
      <div className="flex justify-between text-sm">
        <div className="flex items-center text-gray-600">
          <CalendarDays size={16} className="mr-1" />
          <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
            {isOverdue ? 'Overdue: ' : ''}{formattedDate}
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign size={16} className="mr-1" />
          <span>${budget}</span>
        </div>
      </div>
    </div>
  );
}

export default MissionCard;