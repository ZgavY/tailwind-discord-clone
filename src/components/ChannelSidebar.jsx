import React from 'react';

const ChannelSidebar = ({ channels, activeChannel, setActiveChannel }) => (
  <div className="w-60 bg-gray-900/50 border-r border-green-500/30 flex flex-col z-20">
    <div className="h-12 border-b border-green-500/30 flex items-center px-4">
      <span className="text-green-500 font-bold text-sm">[CRYPTO_TRADING]</span>
    </div>
    <div className="flex-1 overflow-y-auto p-2">
      {Object.entries(channels).map(([cat, list]) => (
        <div key={cat} className="mb-4">
          <div className="text-green-500/70 text-xs mb-1 flex items-center">
            <span className="mr-1">▼</span>
            <span className="uppercase">{cat}/</span>
          </div>
          {list.map(ch => (
            <div
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`flex items-center px-2 py-1 cursor-pointer transition-all
                ${activeChannel === ch.id 
                  ? 'bg-green-500/20 text-green-500 shadow-[inset_0_0_10px_rgba(0,255,65,0.3)]' 
                  : 'text-green-500/70 hover:text-green-500 hover:bg-green-500/10'} ${ch.locked ? 'opacity-50' : ''}`}
            >
              <span className="mr-2">{ch.type === 'voice' ? '🔊' : '#'}</span>
              <span className="text-xs">
                {ch.name}{ch.locked && ' 🔒'}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="h-14 border-t border-green-500/30 flex items-center px-2 bg-black/50">
      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 mr-2"></div>
      <div className="flex-1">
        <div className="text-green-500 text-xs font-bold">root@emoney</div>
        <div className="text-green-500/50 text-xs">#1337</div>
      </div>
      <button className="text-green-500/70 hover:text-green-500 text-xs">⚙</button>
    </div>
  </div>
);

export default ChannelSidebar;