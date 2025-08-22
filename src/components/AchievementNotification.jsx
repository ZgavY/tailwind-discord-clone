import React, { useState, useEffect } from 'react';
import { ACHIEVEMENTS, RARITY_CONFIG } from '../data/achievements';

const AchievementNotification = ({ achievementId, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const achievement = ACHIEVEMENTS[achievementId];
  const rarity = RARITY_CONFIG[achievement?.rarity];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (achievement) {
      // Show notification with animation
      setTimeout(() => setIsVisible(true), 100);
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, handleClose]);

  if (!achievement) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible && !isClosing 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-full'
    }`}>
      <div 
        className="bg-discord-secondary border rounded-xl p-6 shadow-2xl max-w-sm backdrop-blur-sm"
        style={{ 
          borderColor: rarity.color,
          boxShadow: `0 0 20px ${rarity.color}30, ${rarity.glow}`
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🎉</span>
            <span 
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: rarity.color }}
            >
              Achievement Unlocked!
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="text-discord-text-muted hover:text-discord-text-white transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Achievement Info */}
        <div className="text-center">
          <div 
            className="text-4xl mb-3 animate-bounce"
            style={{ 
              filter: `drop-shadow(${rarity.glow})`,
              color: rarity.color
            }}
          >
            {achievement.icon}
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-2">
            <h3 className="text-lg font-bold text-discord-green">
              {achievement.title}
            </h3>
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium animate-pulse"
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
          
          {/* Points Reward */}
          <div className="bg-discord-main/50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💎</span>
              <div>
                <div className="text-lg font-bold text-discord-green">
                  +{achievement.points} Points
                </div>
                <div className="text-xs text-discord-text-muted">
                  Achievement Reward
                </div>
              </div>
            </div>
          </div>

          {/* Unlock Message */}
          {achievement.unlockedMessage && (
            <div className="bg-gradient-to-r from-discord-green/10 to-discord-green-bright/10 border border-discord-green/30 rounded-lg p-3 mb-4">
              <p className="text-sm text-discord-green font-medium">
                {achievement.unlockedMessage}
              </p>
            </div>
          )}

          {/* Action Button */}
          <button 
            onClick={handleClose}
            className="w-full bg-discord-green hover:bg-discord-green-bright text-discord-dark font-semibold py-2 px-4 rounded-lg transition-all"
          >
            Awesome! 🎯
          </button>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <div 
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: rarity.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Achievement Toast - pentru notificări mai mici
export const AchievementToast = ({ achievementId, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const achievement = ACHIEVEMENTS[achievementId];
  const rarity = RARITY_CONFIG[achievement?.rarity];

  useEffect(() => {
    if (achievement) {
      setTimeout(() => setIsVisible(true), 100);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
    }`}>
      <div 
        className="bg-discord-secondary border border-discord-border rounded-lg p-4 shadow-lg backdrop-blur-sm flex items-center space-x-3 max-w-xs"
        style={{ borderColor: rarity.color }}
      >
        <div 
          className="text-2xl"
          style={{ color: rarity.color }}
        >
          {achievement.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-discord-green truncate">
            {achievement.title}
          </div>
          <div className="text-xs text-discord-text-muted">
            +{achievement.points} points
          </div>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-discord-text-muted hover:text-discord-text-white transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Achievement Queue Manager - pentru multiple achievements
export const AchievementQueue = () => {
  const [queue, setQueue] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  const showNext = () => {
    if (queue.length > 0 && !currentNotification) {
      const next = queue[0];
      setCurrentNotification(next);
      setQueue(prev => prev.slice(1));
    }
  };

  const addAchievement = (achievementId) => {
    setQueue(prev => [...prev, achievementId]);
  };

  const handleClose = () => {
    setCurrentNotification(null);
    // Show next achievement after a short delay
    setTimeout(showNext, 500);
  };

  useEffect(() => {
    showNext();
  }, [queue, showNext]);

  // Expose global function pentru triggering
  useEffect(() => {
    window.triggerAchievement = addAchievement;
    return () => {
      delete window.triggerAchievement;
    };
  }, []);

  return (
    <>
      {currentNotification && (
        <AchievementNotification 
          achievementId={currentNotification}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default AchievementNotification;