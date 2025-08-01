import React, { useState } from 'react';

const ChannelSidebar = ({ onChannelClick }) => {
  const [selectedChannel, setSelectedChannel] = useState('welcome');

  const handleChannelClick = (channelId) => {
    setSelectedChannel(channelId);
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
    <div className="w-60 bg-gray-900/50 border-r border-green-500/30 flex flex-col z-20 h-full">
      {/* Pe mobil, adaugă spacing pentru nav bar */}
      <div className="h-12 md:hidden" />
      
      {/* Server Header */}
      <div className="h-12 border-b border-green-500/30 flex items-center px-4">
        <span className="text-green-500 font-bold text-sm">[CRYPTO_TRADING]</span>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <div className="text-green-500/70 text-xs mb-1 flex items-center">
              <span className="mr-1">▼</span>
              <span className="uppercase">{category.name}/</span>
            </div>
            {category.channels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => !channel.locked && handleChannelClick(channel.id)}
                className={`flex items-center px-2 py-1 cursor-pointer transition-all text-xs md:text-xs
                  ${selectedChannel === channel.id 
                    ? 'bg-green-500/20 text-green-500 shadow-[inset_0_0_10px_rgba(0,255,65,0.3)]' 
                    : 'text-green-500/70 hover:text-green-500 hover:bg-green-500/10'
                  } ${channel.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="mr-2">
                  {channel.type === 'voice' ? '🔊' : '#'}
                </span>
                <span className="flex-1 truncate">
                  {channel.name}
                  {channel.locked && ' 🔒'}
                </span>
                {channel.users && (
                  <span className="text-green-500/50 text-xs ml-1">{channel.users}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-14 border-t border-green-500/30 flex items-center px-2 bg-black/50">
        <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 mr-2 flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="text-green-500 text-xs font-bold truncate">root@emoney</div>
          <div className="text-green-500/50 text-xs">#1337</div>
        </div>
        <button className="text-green-500/70 hover:text-green-500 text-xs p-1">⚙</button>
      </div>
    </div>
  );
};

export default ChannelSidebar;