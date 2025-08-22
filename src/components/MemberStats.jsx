import React from 'react';

const MemberStats = ({ user, isDetailed = false }) => {
  const calculateProgress = () => {
    const levels = {
      'ROOKIE_TRADER': { min: 0, max: 50000, next: 'PROFIT_HUNTER' },
      'PROFIT_HUNTER': { min: 50000, max: 500000, next: 'CRYPTO_MASTER' },
      'CRYPTO_MASTER': { min: 500000, max: 1000000, next: 'TRADING_LEGEND' },
      'TRADING_LEGEND': { min: 1000000, max: 2000000, next: 'MATRIX_ARCHITECT' },
      'MATRIX_ARCHITECT': { min: 2000000, max: null, next: null }
    };

    const currentLevel = levels[user.level];
    if (!currentLevel || !currentLevel.max) {
      return { percentage: 100, nextLevel: null, needed: 0 };
    }

    const progress = ((user.totalEarnings - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;
    const needed = currentLevel.max - user.totalEarnings;

    return {
      percentage: Math.min(Math.max(progress, 0), 100),
      nextLevel: currentLevel.next,
      needed: Math.max(needed, 0)
    };
  };

  const formatEarnings = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount}`;
  };

  const getLevelColor = (level) => {
    const colors = {
      'ROOKIE_TRADER': '#00cc33',
      'PROFIT_HUNTER': '#009900',
      'CRYPTO_MASTER': '#00ff41',
      'TRADING_LEGEND': '#39ff14',
      'MATRIX_ARCHITECT': '#ff4444'
    };
    return colors[level] || '#00ff41';
  };

  const getActivityScore = () => {
    // Mock calculation based on various factors
    const baseScore = Math.floor(Math.random() * 100);
    return Math.min(baseScore + (user.totalEarnings / 10000), 100);
  };

  const getTradingPerformance = () => {
    // Mock trading performance data
    return {
      winRate: 67.5,
      avgReturn: 12.3,
      totalTrades: 156,
      bestStreak: 8,
      riskScore: 'Medium'
    };
  };

  const progress = calculateProgress();
  const activityScore = getActivityScore();
  const performance = getTradingPerformance();

  if (!isDetailed) {
    // Compact version
    return (
      <div className="bg-discord-main/30 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-discord-text-muted">Level Progress</span>
          <span className="text-xs font-medium" style={{ color: getLevelColor(user.level) }}>
            {user.level.replace('_', ' ')}
          </span>
        </div>
        <div className="bg-discord-secondary rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all"
            style={{ 
              width: `${progress.percentage}%`,
              backgroundColor: getLevelColor(user.level)
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-discord-text-muted">
          <span>{formatEarnings(user.totalEarnings)}</span>
          {progress.nextLevel && (
            <span>Next: {progress.nextLevel.replace('_', ' ')}</span>
          )}
        </div>
      </div>
    );
  }

  // Detailed version
  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
        <h3 className="font-bold text-discord-green mb-3">Level Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium" style={{ color: getLevelColor(user.level) }}>
              {user.level.replace('_', ' ')}
            </span>
            <span className="text-sm text-discord-text-muted">
              {formatEarnings(user.totalEarnings)} earned
            </span>
          </div>
          
          <div className="bg-discord-main rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all flex items-center justify-end pr-2"
              style={{ 
                width: `${progress.percentage}%`,
                backgroundColor: getLevelColor(user.level)
              }}
            >
              {progress.percentage > 20 && (
                <span className="text-xs font-bold text-discord-dark">
                  {Math.round(progress.percentage)}%
                </span>
              )}
            </div>
          </div>
          
          {progress.nextLevel && (
            <div className="text-sm text-discord-text-muted">
              <span className="text-discord-green">{formatEarnings(progress.needed)}</span> needed for{' '}
              <span className="font-medium">{progress.nextLevel.replace('_', ' ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
        <h3 className="font-bold text-discord-green mb-3">Trading Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-discord-main/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-discord-green">{performance.winRate}%</div>
            <div className="text-xs text-discord-text-muted">Win Rate</div>
          </div>
          <div className="bg-discord-main/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-discord-green">+{performance.avgReturn}%</div>
            <div className="text-xs text-discord-text-muted">Avg Return</div>
          </div>
          <div className="bg-discord-main/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-discord-green">{performance.totalTrades}</div>
            <div className="text-xs text-discord-text-muted">Total Trades</div>
          </div>
          <div className="bg-discord-main/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-discord-green">{performance.bestStreak}</div>
            <div className="text-xs text-discord-text-muted">Best Streak</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-discord-main/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-discord-text-muted">Risk Management</span>
            <span className="text-sm font-medium text-discord-green">{performance.riskScore}</span>
          </div>
        </div>
      </div>

      {/* Activity Score */}
      <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
        <h3 className="font-bold text-discord-green mb-3">Community Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-discord-text-muted">Activity Score</span>
            <span className="text-lg font-bold text-discord-green">{Math.round(activityScore)}/100</span>
          </div>
          
          <div className="bg-discord-main rounded-full h-2">
            <div 
              className="bg-discord-green h-2 rounded-full transition-all"
              style={{ width: `${activityScore}%` }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="font-bold text-discord-green">42</div>
              <div className="text-discord-text-muted">Messages</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-discord-green">12</div>
              <div className="text-discord-text-muted">Course Hours</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-discord-green">8</div>
              <div className="text-discord-text-muted">Days Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
        <h3 className="font-bold text-discord-green mb-3">Recent Achievements</h3>
        <div className="space-y-2">
          {[
            { icon: '🎯', title: 'First Profitable Trade', date: '3 days ago' },
            { icon: '📚', title: 'Completed Trading 101', date: '1 week ago' },
            { icon: '💬', title: 'Active Community Member', date: '2 weeks ago' }
          ].map((achievement, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-discord-main/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{achievement.icon}</span>
                <span className="text-sm text-discord-text-white">{achievement.title}</span>
              </div>
              <span className="text-xs text-discord-text-muted">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberStats;