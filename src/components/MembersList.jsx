import React from 'react';

const MembersList = () => {
  const onlineUsers = [
    { 
      category: 'ROOT—3', 
      roleColor: 'text-red-500',
      users: [
        { name: 'MasterTrader', status: 'online' },
        { name: 'CryptoGuru', status: 'online' },
        { name: 'ForexKing', status: 'away' },
      ]
    },
    { 
      category: 'MODS—5', 
      roleColor: 'text-yellow-500',
      users: [
        { name: 'TechAnalyst', status: 'online' },
        { name: 'ChartMaster', status: 'online' },
        { name: 'RiskManager', status: 'dnd' },
        { name: 'MarketWatch', status: 'online' },
        { name: 'SignalsPro', status: 'away' },
      ]
    },
    { 
      category: 'VIP—47', 
      roleColor: 'text-cyan-500',
      users: [
        { name: 'ProfitHacker', status: 'online' },
        { name: 'MoneyMachine', status: 'online' },
        { name: 'CashFlow95', status: 'away' },
        { name: 'DiamondHands', status: 'online' },
        { name: 'ToTheMoon', status: 'online' },
      ]
    },
    { 
      category: 'USERS—1,284', 
      roleColor: 'text-green-500',
      users: [
        { name: 'Beginner123', status: 'online' },
        { name: 'LearningTrader', status: 'online' },
        { name: 'Student42', status: 'away' },
      ]
    },
  ];

  const statusIndicators = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  return (
    <div className="w-60 bg-gray-900/50 border-l border-green-500/30 p-4 h-full overflow-y-auto">
      {/* Pe mobil, adaugă spacing pentru nav bar */}
      <div className="h-12 md:hidden" />
      
      <div className="text-green-500/70 text-xs mb-3 uppercase">
        [ONLINE - 1,337]
      </div>
      
      <div className="space-y-4">
        {onlineUsers.map((group, idx) => (
          <div key={idx}>
            <div className={`${group.roleColor} text-xs mb-2`}>
              {group.category}
            </div>
            <div className="space-y-1">
              {group.users.map((user, userIdx) => (
                <div key={userIdx} className="flex items-center text-green-500/70 text-xs hover:text-green-500 cursor-pointer group">
                  <div className={`w-2 h-2 ${statusIndicators[user.status]} rounded-full mr-2 ${
                    user.status === 'online' ? 'animate-pulse' : ''
                  }`}></div>
                  <span className="truncate">
                    <span className={group.roleColor}>{group.roleColor.includes('red') ? '#' : '$'}</span> {user.name}
                  </span>
                </div>
              ))}
              {group.category.includes('1,284') && (
                <div className="text-green-500/50 text-xs mt-2 pl-4">
                  ... and 1,276 more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile close hint */}
      <div className="md:hidden mt-8 text-center text-green-500/30 text-xs">
        Tap outside to close
      </div>
    </div>
  );
};

export default MembersList;