import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ACHIEVEMENTS, 
  ACHIEVEMENT_CATEGORIES, 
  RARITY_CONFIG,
  getUserAchievements,
  checkAchievementProgress,
  getAchievementsByCategory,
  getRecentAchievements,
  calculateTotalPoints,
  getProgressToNextLevel
} from '../data/achievements';

const AchievementsView = ({ selectedChannel }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const userAchievements = getUserAchievements(currentUser.id);
  const totalPoints = calculateTotalPoints(currentUser.id);
  const levelProgress = getProgressToNextLevel(totalPoints);
  const recentAchievements = getRecentAchievements(currentUser.id);

  if (selectedChannel !== 'general') {
    return null; // Doar în general channel pentru acum
  }

  const getFilteredAchievements = () => {
    let achievements = Object.values(ACHIEVEMENTS);
    
    if (selectedCategory !== 'all') {
      achievements = getAchievementsByCategory(selectedCategory);
    }
    
    return achievements.map(achievement => {
      const isUnlocked = userAchievements.unlocked.some(ua => ua.id === achievement.id);
      const progress = isUnlocked ? null : checkAchievementProgress(currentUser.id, achievement.id);
      
      return {
        ...achievement,
        isUnlocked,
        progress,
        unlockedAt: isUnlocked ? 
          userAchievements.unlocked.find(ua => ua.id === achievement.id)?.unlockedAt : null
      };
    });
  };

  const AchievementCard = ({ achievement, isCompact = false }) => {
    const rarity = RARITY_CONFIG[achievement.rarity];
    
    if (isCompact) {
      return (
        <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
          achievement.isUnlocked
            ? 'bg-discord-secondary border-discord-green/30 hover:border-discord-green/50'
            : 'bg-discord-main/30 border-discord-border/30 opacity-60'
        }`}>
          <div 
            className={`text-2xl ${achievement.isUnlocked ? '' : 'filter grayscale'}`}
            style={achievement.isUnlocked ? { 
              filter: `drop-shadow(${rarity.glow})`,
              color: rarity.color 
            } : {}}
          >
            {achievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`font-semibold text-sm ${
                achievement.isUnlocked ? 'text-discord-green' : 'text-discord-text-muted'
              }`}>
                {achievement.title}
              </span>
              <span 
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${rarity.color}20`,
                  color: rarity.color
                }}
              >
                {rarity.name}
              </span>
            </div>
            <p className="text-xs text-discord-text-muted truncate">
              {achievement.description}
            </p>
            {achievement.progress && (
              <div className="mt-1">
                <div className="bg-discord-secondary rounded-full h-1">
                  <div 
                    className="bg-discord-green h-1 rounded-full transition-all"
                    style={{ width: `${achievement.progress.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-discord-text-muted mt-0.5">
                  {achievement.progress.current}/{achievement.progress.required}
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${
              achievement.isUnlocked ? 'text-discord-green' : 'text-discord-text-muted'
            }`}>
              {achievement.points}pts
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-discord-secondary border rounded-xl p-6 transition-all hover:scale-105 ${
        achievement.isUnlocked
          ? 'border-discord-green/30 hover:border-discord-green/50 hover:shadow-lg'
          : 'border-discord-border/30 opacity-60'
      }`}>
        <div className="text-center">
          <div 
            className={`text-4xl mb-3 ${achievement.isUnlocked ? '' : 'filter grayscale'}`}
            style={achievement.isUnlocked ? { 
              filter: `drop-shadow(${rarity.glow})`,
              color: rarity.color 
            } : {}}
          >
            {achievement.icon}
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className={`font-bold ${
              achievement.isUnlocked ? 'text-discord-green' : 'text-discord-text-muted'
            }`}>
              {achievement.title}
            </h3>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${rarity.color}20`,
                color: rarity.color
              }}
            >
              {rarity.name}
            </span>
          </div>
          
          <p className="text-sm text-discord-text-muted mb-4 leading-relaxed">
            {achievement.description}
          </p>
          
          {achievement.progress && (
            <div className="mb-4">
              <div className="bg-discord-main rounded-full h-2 mb-2">
                <div 
                  className="bg-discord-green h-2 rounded-full transition-all"
                  style={{ width: `${achievement.progress.percentage}%` }}
                />
              </div>
              <div className="text-xs text-discord-text-muted">
                Progress: {achievement.progress.current}/{achievement.progress.required} ({achievement.progress.percentage}%)
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-discord-border/30">
            <div className={`text-lg font-bold ${
              achievement.isUnlocked ? 'text-discord-green' : 'text-discord-text-muted'
            }`}>
              {achievement.points} points
            </div>
            
            {achievement.isUnlocked && achievement.unlockedAt && (
              <div className="text-xs text-discord-text-muted">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString('ro-RO', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header & Progress */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-discord-green">🏆 Achievements</h1>
        <p className="text-discord-text-muted">Track your progress and unlock rewards</p>
        
        {/* Level Progress */}
        <div className="bg-discord-secondary border border-discord-border rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-left">
              <div className="text-sm text-discord-text-muted">Achievement Level</div>
              <div 
                className="text-xl font-bold"
                style={{ color: levelProgress.currentLevel.color }}
              >
                {levelProgress.currentLevel.name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-discord-text-muted">Total Points</div>
              <div className="text-xl font-bold text-discord-green">
                {totalPoints.toLocaleString()}
              </div>
            </div>
          </div>
          
          {levelProgress.nextLevel && (
            <>
              <div className="bg-discord-main rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all"
                  style={{ 
                    width: `${levelProgress.progress}%`,
                    backgroundColor: levelProgress.nextLevel.color
                  }}
                />
              </div>
              <div className="flex justify-between text-sm text-discord-text-muted">
                <span>{Math.round(levelProgress.progress)}% to {levelProgress.nextLevel.name}</span>
                <span>{levelProgress.pointsToNext} points needed</span>
              </div>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-discord-secondary rounded-lg p-3">
            <div className="text-lg font-bold text-discord-green">{userAchievements.unlocked.length}</div>
            <div className="text-xs text-discord-text-muted">Unlocked</div>
          </div>
          <div className="bg-discord-secondary rounded-lg p-3">
            <div className="text-lg font-bold text-discord-green">{Object.keys(ACHIEVEMENTS).length - userAchievements.unlocked.length}</div>
            <div className="text-xs text-discord-text-muted">Remaining</div>
          </div>
          <div className="bg-discord-secondary rounded-lg p-3">
            <div className="text-lg font-bold text-discord-green">{Math.round((userAchievements.unlocked.length / Object.keys(ACHIEVEMENTS).length) * 100)}%</div>
            <div className="text-xs text-discord-text-muted">Complete</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-discord-main rounded-lg p-1">
        {[
          { id: 'overview', name: '📋 Overview' },
          { id: 'recent', name: '⭐ Recent' },
          { id: 'progress', name: '📈 In Progress' },
          { id: 'all', name: '🏆 All Achievements' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-discord-green text-discord-dark'
                : 'text-discord-text-muted hover:text-discord-green hover:bg-discord-secondary/50'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Recent Achievements */}
          <div className="bg-discord-secondary border border-discord-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-discord-green mb-4">🎉 Recently Unlocked</h3>
            <div className="space-y-3">
              {recentAchievements.length > 0 ? recentAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} isCompact={true} />
              )) : (
                <div className="text-center py-4 text-discord-text-muted">
                  No recent achievements. Keep going! 💪
                </div>
              )}
            </div>
          </div>

          {/* Categories Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(ACHIEVEMENT_CATEGORIES).map(category => {
              const categoryAchievements = getAchievementsByCategory(category.id);
              const unlockedCount = categoryAchievements.filter(a => 
                userAchievements.unlocked.some(ua => ua.id === a.id)
              ).length;
              
              return (
                <div key={category.id} className="bg-discord-secondary border border-discord-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h4 className="font-bold text-discord-green">{category.name}</h4>
                      <p className="text-xs text-discord-text-muted">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-discord-text-muted">
                      {unlockedCount}/{categoryAchievements.length} completed
                    </span>
                    <div className="bg-discord-main rounded-full h-2 w-20">
                      <div 
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          width: `${(unlockedCount / categoryAchievements.length) * 100}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Tab */}
      {activeTab === 'recent' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      )}

      {/* In Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-4">
          {userAchievements.nextToUnlock.map(achievementId => {
            const achievement = ACHIEVEMENTS[achievementId];
            if (!achievement) return null;
            
            const progress = checkAchievementProgress(currentUser.id, achievementId);
            return (
              <AchievementCard 
                key={achievementId} 
                achievement={{ ...achievement, progress, isUnlocked: false }} 
                isCompact={true}
              />
            );
          })}
        </div>
      )}

      {/* All Achievements Tab */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-discord-green text-discord-dark'
                  : 'bg-discord-secondary text-discord-text-muted hover:text-discord-green'
              }`}
            >
              All Categories
            </button>
            {Object.values(ACHIEVEMENT_CATEGORIES).map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-discord-green text-discord-dark'
                    : 'bg-discord-secondary text-discord-text-muted hover:text-discord-green'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredAchievements().map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsView;