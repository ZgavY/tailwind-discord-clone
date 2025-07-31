import React from 'react';

const ServerList = ({ courses }) => (
  <div className="w-20 bg-gray-900 border-r border-green-500/30 flex flex-col items-center py-4 space-y-3 z-20">
    <div className="w-12 h-12 bg-black border border-green-500 flex items-center justify-center text-green-500 font-bold text-lg mb-2 cursor-pointer hover:bg-green-500/10 transition-all">
      E$
    </div>
    <div className="w-12 h-px bg-green-500/50"></div>
    {courses.map(c => (
      <div
        key={c.id}
        className={`w-12 h-12 border border-green-500/50 flex items-center justify-center text-xl cursor-pointer transition-all
          ${c.active 
            ? 'bg-green-500/20 text-green-500 shadow-[0_0_15px_rgba(0,255,65,0.5)]' 
            : 'bg-black hover:bg-green-500/10 hover:border-green-500 text-green-500/70 hover:text-green-500'}`}
        title={c.name}
      >
        {c.icon}
      </div>
    ))}
    <div className="w-12 h-12 border-dashed border border-green-500/30 flex items-center justify-center text-green-500/50 hover:text-green-500 cursor-pointer transition-all">+</div>
  </div>
);

export default ServerList;