import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getChannelsByCategory, canUserAccessChannel } from '../utils/permissions';

const ChannelSidebar = ({ selectedChannel, onChannelChange, onChannelClick }) => {
  const { currentUser } = useAuth();

  const handleChannelClick = (channelId) => {
    // Check permissions before switching
    if (!canUserAccessChannel(currentUser, channelId)) {
      return; // Nu permite accesul
    }
    
    onChannelChange(channelId);
    // Pe mobil, închide sidebar după selectare
    if (window.innerWidth < 768 && onChannelClick) {
      onChannelClick();
    }
  };

  // Get channels based on user permissions
  const channelsByCategory = getChannelsByCategory(currentUser);
  
  const categoryMapping = {
    general: { name: 'INFORMAȚII', order: 1 },
    social: { name: 'COMUNITATE', order: 2 },
    education: { name: 'CURSURI', order: 3 },
    mentor: { name: 'MENTOR ZONE', order: 4 },
    admin: { name: 'ADMIN PANEL', order: 5 }
  };

  const categories = Object.entries(channelsByCategory)
    .filter(([_, channels]) => channels.length > 0)
    .map(([categoryId, channels]) => ({
      id: categoryId,
      name: categoryMapping[categoryId]?.name || categoryId.toUpperCase(),
      order: categoryMapping[categoryId]?.order || 99,
      channels: channels.map(channel => ({
        id: channel.id,
        name: `${channel.name}.${getChannelExtension(channel)}`,
        type: 'text',
        icon: channel.icon,
        description: channel.description,
        locked: !canUserAccessChannel(currentUser, channel.id)
      }))
    }))
    .sort((a, b) => a.order - b.order);

  function getChannelExtension(channel) {
    const extensions = {
      welcome: 'txt',
      rules: 'md', 
      general: 'chat',
      basics: 'py',
      advanced: 'py',
      defi: 'sol',
      'mentor-lounge': 'vip',
      'strategy-lab': 'lab',
      'admin-control': 'sys'
    };
    return extensions[channel.id] || 'log';
  }

  return (
    <div className="w-60 bg-discord-channels border-r border-discord-border flex flex-col z-20 h-full shadow-matrix">
      {/* Pe mobil, adaugă spacing pentru nav bar */}
      <div className="h-12 md:hidden" />
      
      {/* Server Header */}
      <div className="h-12 border-b border-discord-border flex items-center px-4 shadow-md">
        <span className="text-discord-green font-semibold text-sm">[E-MONEY_SOCIETY]</span>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <div className="text-discord-text-muted text-xs font-semibold mb-1 flex items-center uppercase">
              <span className="mr-1">▼</span>
              <span className="uppercase text-discord-green">{category.name}/</span>
            </div>
            {category.channels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => handleChannelClick(channel.id)}
                className={`flex items-center px-2 py-1 mx-1 rounded cursor-pointer transition-all text-sm group relative
                  ${selectedChannel === channel.id 
                    ? 'bg-discord-green-dim text-discord-dark font-semibold' 
                    : channel.locked
                    ? 'text-discord-text-dark opacity-40 cursor-not-allowed'
                    : 'text-discord-text-muted hover:text-discord-green hover:bg-discord-hover/30'
                  }`}
                title={channel.description}
              >
                <span className="mr-2 text-discord-green">
                  {channel.icon || (channel.type === 'voice' ? '🔊' : '#')}
                </span>
                <span className="flex-1 truncate">
                  {channel.name}
                </span>
                {channel.locked && (
                  <span className="text-red-400 text-xs ml-1">🔒</span>
                )}
                
                {/* Tooltip pentru locked channels */}
                {channel.locked && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-discord-main border border-discord-border rounded text-xs text-discord-text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    Access restricted to {currentUser.role === 'member' ? 'higher levels' : 'your role'}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-14 border-t border-discord-border flex items-center px-2 bg-discord-channels">
        <div className="relative mr-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-glow-green-sm"
            style={{ backgroundColor: currentUser.color }}
          >
            {currentUser.avatar}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5">
            <div 
              className="w-3 h-3 rounded-full border border-discord-channels"
              style={{ backgroundColor: '#00ff41' }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-discord-green text-sm font-semibold truncate">{currentUser.username}</div>
          <div className="text-discord-text-muted text-xs">{currentUser.level.split('_')[0]} • {currentUser.role}</div>
        </div>
        <button 
          className="text-discord-text-muted hover:text-discord-green text-lg p-1 transition-all"
          title="Settings"
        >
          ⚙
        </button>
      </div>
    </div>
  );
};

export default ChannelSidebar;