import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CHANNELS, USER_LEVELS } from '../utils/permissions';

const AccessDenied = ({ channelId, onClose }) => {
  const { currentUser } = useAuth();
  const channel = CHANNELS[channelId];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close după 5 secunde

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!channel) return null;

  const getRequiredLevel = () => {
    if (channel.requiredLevel) {
      return USER_LEVELS[channel.requiredLevel]?.name || channel.requiredLevel;
    }
    return 'Unknown';
  };

  const getUpgradeInfo = () => {
    if (currentUser.role === 'member') {
      const currentLevel = USER_LEVELS[currentUser.level];
      const requiredLevel = USER_LEVELS[channel.requiredLevel];
      
      if (requiredLevel && currentLevel) {
        const earningsNeeded = requiredLevel.minEarnings - currentUser.totalEarnings;
        if (earningsNeeded > 0) {
          return `Earn $${earningsNeeded.toLocaleString()} more to unlock this channel`;
        }
      }
    }
    
    if (channel.category === 'mentor') {
      return 'Become a mentor to access this channel';
    }
    
    if (channel.category === 'admin') {
      return 'Admin access required';
    }
    
    return 'Upgrade your account to access this channel';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-discord-secondary border border-red-500/50 rounded-xl max-w-md w-full shadow-2xl animate-pulse">
        <div className="p-6 text-center">
          {/* Lock Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Channel Info */}
          <h2 className="text-xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-discord-text-white mb-4">
            {channel.icon} <strong>#{channel.name}</strong> is restricted
          </p>
          
          {/* Requirements */}
          <div className="bg-discord-main/50 rounded-lg p-4 mb-4 text-left">
            <h3 className="text-sm font-semibold text-discord-green mb-2">Requirements:</h3>
            <ul className="text-sm text-discord-text-muted space-y-1">
              <li>• Role: <span className="text-discord-green">{channel.category}</span></li>
              <li>• Level: <span className="text-discord-green">{getRequiredLevel()}</span></li>
              {channel.requiredPermissions.length > 0 && (
                <li>• Permissions: <span className="text-discord-green">{channel.requiredPermissions.join(', ')}</span></li>
              )}
            </ul>
          </div>
          
          {/* Upgrade Info */}
          <div className="bg-gradient-to-r from-discord-green/10 to-discord-green-bright/10 border border-discord-green/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-discord-green font-medium">
              {getUpgradeInfo()}
            </p>
          </div>
          
          {/* Current Status */}
          <div className="text-xs text-discord-text-muted mb-4">
            Your current level: <span className="text-discord-green">{currentUser.level.replace('_', ' ')}</span><br/>
            Total earnings: <span className="text-discord-green">${currentUser.totalEarnings.toLocaleString()}</span>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="w-full bg-discord-green hover:bg-discord-green-bright text-discord-dark font-semibold py-2 px-4 rounded-lg transition-all"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;