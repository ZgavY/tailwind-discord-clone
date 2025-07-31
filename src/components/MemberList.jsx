// src/components/MemberList.jsx
import React from 'react';

const MemberList = () => (
  <div className="w-60 bg-gray-900/50 border-l border-green-500/30 p-4 z-20 font-mono">
    <div className="text-green-500/70 text-xs mb-3 uppercase">[ONLINE – 1,337]</div>

    {/* ROOTS */}
    <div className="mb-4">
      <div className="text-red-500 text-xs mb-2">ROOT—3</div>
      <div className="space-y-1">
        <div className="flex items-center text-green-500 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-red-500 mr-1">#</span> MasterTrader
        </div>
        <div className="flex items-center text-green-500 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-red-500 mr-1">#</span> CryptoGuru
        </div>
        <div className="flex items-center text-green-500 text-xs">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-red-500 mr-1">#</span> ForexKing
        </div>
      </div>
    </div>

    {/* USERS */}
    <div>
      <div className="text-green-500 text-xs mb-2">USERS—1,334</div>
      <div className="space-y-1 text-green-500/70 text-xs">
        {['ProfitHacker', 'MoneyMachine', 'CashFlow95', 'DiamondHands', 'ToTheMoon'].map(user => (
          <div key={user} className="flex items-center">
            <div className="w-2 h-2 bg-green-500/50 rounded-full mr-2"></div>
            <span>$</span>&nbsp;{user}
          </div>
        ))}
        <div className="text-green-500/50 text-xs mt-2">... and 1,329 more</div>
      </div>
    </div>
  </div>
);

export default MemberList;