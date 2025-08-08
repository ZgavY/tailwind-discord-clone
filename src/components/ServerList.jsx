import React, { useState } from 'react';

const ServerList = ({ onServerClick }) => {
  const [selectedServer, setSelectedServer] = useState(1);

  const servers = [
    { id: 1, name: 'E-Money Society', icon: '💰' },
    { id: 2, name: 'Crypto Trading', icon: '₿' },
    { id: 3, name: 'Forex Masters', icon: '💱' },
    { id: 4, name: 'NFT Flippers', icon: '🎨' },
    { id: 5, name: 'Stock Market', icon: '📈' },
  ];

  const handleServerClick = (serverId) => {
    setSelectedServer(serverId);
    // Pe mobil, închide server list și deschide channels
    if (window.innerWidth < 768 && onServerClick) {
      onServerClick();
    }
  };

  return (
    <div className="w-20 md:w-20 bg-discord-sidebar border-r border-discord-border flex flex-col items-center py-4 space-y-3 z-20 h-full shadow-matrix">
      {/* Pe mobil, adaugă spacing pentru nav bar */}
      <div className="h-12 md:hidden" />
      
      {/* Logo */}
      <div className="w-12 h-12 bg-discord-green-bright/20 rounded-full flex items-center justify-center text-discord-green-bright font-bold text-lg mb-2 cursor-pointer hover:bg-discord-green-bright/30 hover:rounded-2xl hover:shadow-glow-green-sm transition-all duration-200">
        E$
      </div>
      
      <div className="w-8 h-px bg-discord-text-dark"></div>
      
      {/* Servers */}
      {servers.map((server) => (
        <div
          key={server.id}
          onClick={() => handleServerClick(server.id)}
          className={`w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-all duration-200
            ${selectedServer === server.id 
              ? 'bg-discord-green-bright/20 text-discord-green-bright rounded-2xl' 
              : 'bg-discord-secondary text-discord-text-muted hover:bg-discord-green-bright/10 hover:text-discord-green-bright hover:shadow-glow-green-sm rounded-full hover:rounded-2xl'
            }`}
          title={server.name}
        >
          {server.icon}
        </div>
      ))}
      
      {/* Add new */}
      <div className="w-12 h-12 bg-discord-secondary rounded-full flex items-center justify-center text-discord-green-bright text-2xl cursor-pointer hover:bg-discord-green-bright/10 hover:rounded-2xl hover:shadow-glow-green-sm transition-all duration-200">
        +
      </div>
    </div>
  );
};

export default ServerList;