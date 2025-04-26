import React from 'react';

function ActivityItem({ type, message, timestamp }) {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  
  const timeAgo = () => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className="flex items-start space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        type === 'mission_completed' ? 'bg-green-100 text-green-500' :
        type === 'payment_received' ? 'bg-yellow-100 text-yellow-500' :
        'bg-blue-100 text-blue-500'
      }`}>
        <span className="text-lg">•</span>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{message}</p>
        <p className="text-xs text-gray-500">{timeAgo()}</p>
      </div>
    </div>
  );
}

export default ActivityItem;