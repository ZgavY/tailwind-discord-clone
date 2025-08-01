import React, { useState } from 'react';

const MainContent = () => {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      author: 'TradingMaster',
      role: 'admin',
      time: '09:42',
      content: 'Bună dimineața, traderi! BTC arată foarte bine astăzi.',
    },
    {
      id: 2,
      author: 'CryptoGuru',
      role: 'mod',
      time: '09:45',
      content: 'ETH se consolidează frumos. Am deschis o poziție long.',
    },
    {
      id: 3,
      author: 'BeginnerTrader',
      role: 'user',
      time: '09:47',
      content: 'Salut! Sunt nou aici. De unde recomandați să încep?',
    },
  ];

  const roleColors = {
    admin: 'text-red-500',
    mod: 'text-yellow-500',
    user: 'text-green-500',
  };

  return (
    <div className="flex-1 flex flex-col z-20 bg-black/50">
      {/* Channel Header - ascuns pe mobile (e în MobileNav) */}
      <div className="hidden md:flex h-12 border-b border-green-500/30 items-center px-4 bg-gray-900/50">
        <span className="text-green-500 mr-2">#</span>
        <span className="text-green-500 font-bold">welcome</span>
        <span className="text-green-500/50 text-xs ml-4">
          E-MONEY SOCIETY: WHERE PROFITS MEET CODE_
        </span>
      </div>

      {/* Messages Area - cu padding pentru mobile nav */}
      <div className="flex-1 overflow-y-auto p-4 pt-16 md:pt-4 bg-black/50">
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Welcome ASCII Art - mai mic pe mobile */}
          <div className="text-green-500 text-xs whitespace-pre font-mono mb-8">
            <div className="hidden md:block">
{`╔═══════════════════════════════════════════╗
║      E-MONEY SOCIETY - TERMINAL v1.0      ║
║         "WEALTH THROUGH CODE"             ║
╚═══════════════════════════════════════════╝`}
            </div>
            <div className="md:hidden text-center">
              <div className="text-lg font-bold">E-MONEY SOCIETY</div>
              <div className="text-xs">TERMINAL v1.0</div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col md:flex-row md:items-start space-y-1 md:space-y-0">
                <div className="flex items-baseline space-x-2">
                  <span className={`${roleColors[msg.role]} font-bold`}>
                    [{msg.author.toUpperCase()}]
                  </span>
                  <span className="text-green-500/50 text-xs">{msg.time}</span>
                </div>
                <div className="text-green-500 md:ml-2 pl-4 md:pl-0">
                  <span className="text-green-500/70 text-xs md:inline hidden">$</span> {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area - mai simplu pe mobile */}
      <div className="h-16 border-t border-green-500/30 flex items-center px-4 bg-gray-900/50">
        <span className="text-green-500 mr-2 hidden md:inline">$</span>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-transparent text-green-500 placeholder-green-500/30 outline-none text-sm"
        />
        <button className="text-green-500/50 hover:text-green-500 ml-2 p-2 md:p-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MainContent;