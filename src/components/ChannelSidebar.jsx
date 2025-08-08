import React from 'react';

const ChannelSidebar = ({ selectedChannel, onChannelChange, onChannelClick }) => {

  const handleChannelClick = (channelId) => {
    onChannelChange(channelId);
    // Pe mobil, închide sidebar după selectare
    if (window.innerWidth < 768 && onChannelClick) {
      onChannelClick();
    }
  };

  const categories = [
    {
      id: 'info',
      name: 'INFORMAȚII',
      channels: [
        { id: 'welcome', name: 'welcome.txt', type: 'text' },
        { id: 'rules', name: 'rules.md', type: 'text' },
        { id: 'announcements', name: 'announcements.log', type: 'text' },
      ]
    },
    {
      id: 'learning',
      name: 'CURSURI',
      channels: [
        { id: 'basics', name: '01_basics.py', type: 'text' },
        { id: 'advanced', name: '02_advanced.py', type: 'text' },
        { id: 'strategies', name: '03_strategies.py', type: 'text' },
        { id: 'live', name: 'live_session.stream', type: 'voice', users: 15 },
      ]
    },
    {
      id: 'community',
      name: 'COMUNITATE',
      channels: [
        { id: 'general', name: 'general.chat', type: 'text' },
        { id: 'trades', name: 'trades.log', type: 'text' },
        { id: 'signals', name: 'signals.alert', type: 'text', locked: true },
      ]
    }
  ];

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
                onClick={() => !channel.locked && handleChannelClick(channel.id)}
                className={`flex items-center px-2 py-1 mx-1 rounded cursor-pointer transition-all text-sm
                  ${selectedChannel === channel.id 
                    ? 'bg-discord-green-dim text-discord-text' 
                    : 'text-discord-text-muted hover:text-discord-green hover:bg-discord-hover/30'
                  } ${channel.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="mr-2 text-discord-green">
                  {channel.type === 'voice' ? '🔊' : '#'}
                </span>
                <span className="flex-1 truncate">
                  {channel.name}
                  {channel.locked && ' 🔒'}
                </span>
                {channel.users && (
                  <span className="text-discord-text-dark text-xs ml-1">{channel.users}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-14 border-t border-discord-border flex items-center px-2 bg-discord-channels">
        <div className="w-8 h-8 rounded-full bg-discord-green-bright mr-2 flex-shrink-0 shadow-glow-green-sm"></div>
        <div className="flex-1 min-w-0">
          <div className="text-discord-green text-sm font-semibold truncate">root@emoney</div>
          <div className="text-discord-text-muted text-xs">#1337</div>
        </div>
        <button className="text-discord-text-muted hover:text-discord-green text-lg p-1 transition-all">⚙</button>
      </div>
    </div>
  );
};

export default ChannelSidebar;