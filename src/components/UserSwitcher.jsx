import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatusIndicator from './StatusIndicator';

const UserSwitcher = () => {
  const { currentUser, mockUsers, switchUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleUserSwitch = (userId) => {
    switchUser(userId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-discord-secondary/80 backdrop-blur-sm hover:bg-discord-secondary border border-discord-border/50 rounded-lg px-3 py-2 text-sm transition-all"
        >
          <div className="relative">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: currentUser.color }}
            >
              {currentUser.avatar}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5">
              <StatusIndicator status={currentUser.status} size="xs" />
            </div>
          </div>
          <span className="text-discord-green">{currentUser.displayName}</span>
          <svg 
            className={`w-4 h-4 text-discord-green transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-discord-secondary border border-discord-border/50 rounded-lg shadow-xl backdrop-blur-sm overflow-hidden">
            <div className="p-2 border-b border-discord-border/30">
              <span className="text-xs text-discord-text-muted font-medium">DEV: Switch User</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {mockUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleUserSwitch(user.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-discord-hover/10 transition-all ${
                    currentUser.id === user.id ? 'bg-discord-green/10' : ''
                  }`}
                >
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.avatar}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <StatusIndicator status={user.status} size="xs" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-discord-green">{user.displayName}</div>
                    <div className="text-xs text-discord-text-muted">
                      {user.username} • {user.role} • {user.level.split('_')[0]}
                    </div>
                  </div>
                  {currentUser.id === user.id && (
                    <div className="w-2 h-2 bg-discord-green rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSwitcher;