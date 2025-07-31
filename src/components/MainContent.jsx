// src/components/MainContent.jsx
import React from 'react';

const MainContent = ({ activeChannel, typingText, showCursor }) => (
  <div className="flex-1 flex flex-col z-20">
    {/* Channel Header */}
    <div className="h-12 border-b border-green-500/30 flex items-center px-4 bg-gray-900/50">
      <span className="text-green-500 mr-2">#</span>
      <span className="text-green-500 font-bold">{activeChannel}.txt</span>
      <span className="text-green-500/50 text-xs ml-4">
        {typingText}
        {showCursor && <span className="text-green-500">_</span>}
      </span>
    </div>

    {/* Messages Area */}
    <div className="flex-1 overflow-y-auto p-4 bg-black/50 font-mono text-green-500 text-xs space-y-4">

      {/* ADMIN */}
      <div className="flex items-start">
        <span className="text-cyan-500 mr-2">[ADMIN]</span>
        <div className="flex-1">
          <div className="text-green-500">
            <span className="text-green-500/70 text-xs">root@emoney ~ $</span> Welcome to E-Money Society!
          </div>
          <div className="text-green-500/80 mt-1 text-xs">
            Here you'll learn how to hack the financial system (legally).
          </div>
        </div>
        <span className="text-green-500/50 text-xs">00:42</span>
      </div>

      {/* MOD */}
      <div className="flex items-start">
        <span className="text-yellow-500 mr-2">[MOD]</span>
        <div className="flex-1">
          <div className="text-green-500">
            <span className="text-green-500/70 text-xs">mentor@crypto ~ $</span> New signal dropped in #signals
          </div>
          <div className="text-green-500/80 mt-1 text-xs">
            BTC looking bullish. Check the technical analysis in lesson 3.
          </div>
        </div>
        <span className="text-green-500/50 text-xs">00:45</span>
      </div>

      {/* USER */}
      <div className="flex items-start">
        <span className="text-green-500 mr-2">[USER]</span>
        <div className="flex-1">
          <div className="text-green-500">
            <span className="text-green-500/70 text-xs">noob@trading ~ $</span> Just made my first $1k!
          </div>
          <div className="text-green-500/80 mt-1 text-xs">
            The strategies from module 2 are insane 🚀
          </div>
        </div>
        <span className="text-green-500/50 text-xs">00:47</span>
      </div>
    </div>

    {/* Input */}
    <div className="h-16 border-t border-green-500/30 flex items-center px-4 bg-gray-900/50">
      <span className="text-green-500 mr-2">$</span>
      <input
        type="text"
        placeholder="Scrie un mesaj..."
        className="flex-1 bg-transparent text-green-500 placeholder-green-500/30 outline-none text-sm"
      />
      <span className="text-green-500 animate-pulse">…</span>
    </div>
  </div>
);

export default MainContent;