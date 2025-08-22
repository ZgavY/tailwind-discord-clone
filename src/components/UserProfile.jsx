import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = ({ userId, isModal = false, onClose }) => {
  const { mockUsers, currentUser } = useAuth();
  const user = mockUsers.find(u => u.id === userId) || currentUser;

  const formatEarnings = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount}`;
  };

  const getBadgeIcon = (badge) => {
    const badges = {
      founder: '👑',
      verified: '✅',
      trader_pro: '📈',
      mentor: '🎯',
      defi_expert: '⚡',
      wall_street: '🏛️',
      new_member: '🌱',
      active_trader: '💎',
      community_star: '⭐'
    };
    return badges[badge] || '🏆';
  };

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

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-discord-secondary border border-discord-border rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="relative">
            {/* Header */}
            <div className="p-6 border-b border-discord-border/30">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-discord-text-muted hover:text-discord-green transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.avatar}
                  </div>
                  <div 
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-discord-secondary"
                    style={{ backgroundColor: getStatusColor(user.status) }}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-discord-green">{user.displayName}</h2>
                  <p className="text-discord-text-muted">@{user.username}</p>
                  <p className="text-sm" style={{ color: getStatusColor(user.status) }}>
                    {getStatusText(user.status)}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="text-sm font-semibold text-discord-green uppercase tracking-wide mb-2">About</h3>
                <p className="text-discord-text-white text-sm leading-relaxed">{user.bio}</p>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-sm font-semibold text-discord-green uppercase tracking-wide mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-discord-main/50 rounded-lg p-3">
                    <div className="text-xs text-discord-text-muted">Total Earnings</div>
                    <div className="text-lg font-bold text-discord-green">{formatEarnings(user.totalEarnings)}</div>
                  </div>
                  <div className="bg-discord-main/50 rounded-lg p-3">
                    <div className="text-xs text-discord-text-muted">Level</div>
                    <div className="text-sm font-bold text-discord-green-bright">{user.level}</div>
                  </div>
                  <div className="bg-discord-main/50 rounded-lg p-3">
                    <div className="text-xs text-discord-text-muted">Role</div>
                    <div className="text-sm font-bold capitalize" style={{ color: user.color }}>{user.role}</div>
                  </div>
                  <div className="bg-discord-main/50 rounded-lg p-3">
                    <div className="text-xs text-discord-text-muted">Joined</div>
                    <div className="text-sm font-bold text-discord-text-white">
                      {new Date(user.joinDate).toLocaleDateString('ro-RO', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-sm font-semibold text-discord-green uppercase tracking-wide mb-3">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map(badge => (
                    <div 
                      key={badge} 
                      className="flex items-center space-x-1 bg-discord-main/50 px-3 py-1 rounded-full border border-discord-border/30"
                    >
                      <span className="text-sm">{getBadgeIcon(badge)}</span>
                      <span className="text-xs text-discord-text-white capitalize">{badge.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact profile for hover/inline display
  return (
    <div className="bg-discord-secondary border border-discord-border rounded-lg p-4 w-64 shadow-lg">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: user.color }}
          >
            {user.avatar}
          </div>
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-discord-secondary"
            style={{ backgroundColor: getStatusColor(user.status) }}
          />
        </div>
        <div>
          <h3 className="font-bold text-discord-green">{user.displayName}</h3>
          <p className="text-xs text-discord-text-muted">@{user.username}</p>
        </div>
      </div>
      
      <div className="text-xs text-discord-text-white mb-3">{user.bio}</div>
      
      <div className="flex justify-between text-xs">
        <div>
          <span className="text-discord-text-muted">Earnings: </span>
          <span className="text-discord-green font-semibold">{formatEarnings(user.totalEarnings)}</span>
        </div>
        <div>
          <span className="text-discord-text-muted">Level: </span>
          <span className="text-discord-green-bright font-semibold">{user.level.split('_')[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;