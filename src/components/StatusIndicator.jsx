import React from 'react';

const StatusIndicator = ({ status, size = 'sm', showText = false }) => {
  const getStatusColor = (status) => {
    const colors = {
      online: '#00ff41',
      away: '#ffaa00', 
      dnd: '#ff4444',
      offline: '#666666'
    };
    return colors[status] || colors.offline;
  };

  const getStatusText = (status) => {
    const texts = {
      online: 'Online',
      away: 'Away',
      dnd: 'Do Not Disturb',
      offline: 'Offline'
    };
    return texts[status] || 'Unknown';
  };

  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm'
  };

  return (
    <div className="flex items-center space-x-1">
      <div 
        className={`${sizeClasses[size]} rounded-full flex-shrink-0 ${status === 'online' ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: getStatusColor(status) }}
      />
      {showText && (
        <span className={`${textSizeClasses[size]} font-medium`} style={{ color: getStatusColor(status) }}>
          {getStatusText(status)}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;