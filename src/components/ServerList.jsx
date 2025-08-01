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
    <div className="w-20 md:w-20 bg-gray-900 flex flex-col items-center py-4 space-y-3 z-20 h-full">
      {/* Pe mobil, adaugă spacing pentru nav bar */}
      <div className="h-12 md:hidden" />
      
      {/* Logo */}
      <div className="w-12 h-12 bg-black border border-green-500 flex items-center justify-center text-green-500 font-bold text-lg mb-2 cursor-pointer hover:bg-green-500/10 hover:shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-all">
        E$
      </div>
      
      <div className="w-12 h-px bg-green-500/50"></div>
      
      {/* Servers */}
      {servers.map((server) => (
        <div
          key={server.id}
          onClick={() => handleServerClick(server.id)}
          className={`w-12 h-12 border border-green-500/50 flex items-center justify-center text-xl cursor-pointer transition-all
            ${selectedServer === server.id 
              ? 'bg-green-500/20 text-green-500 shadow-[0_0_15px_rgba(0,255,65,0.5)]' 
              : 'bg-black hover:bg-green-500/10 hover:border-green-500 text-green-500/70 hover:text-green-500'
            }`}
          title={server.name}
        >
          {server.icon}
        </div>
      ))}
      
      {/* Add new */}
      <div className="w-12 h-12 border border-green-500/30 border-dashed flex items-center justify-center text-green-500/50 hover:text-green-500 hover:border-green-500 cursor-pointer transition-all">
        +
      </div>
    </div>
  );
};

export default ServerList;