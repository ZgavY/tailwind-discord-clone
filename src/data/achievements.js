// E-Money Society Achievement System
// Gamification pentru motivation și engagement

export const ACHIEVEMENT_CATEGORIES = {
  trading: {
    id: 'trading',
    name: 'Trading Mastery',
    icon: '📈',
    color: '#00ff41',
    description: 'Trading performance and profit achievements'
  },
  learning: {
    id: 'learning',
    name: 'Knowledge Seeker',
    icon: '📚',
    color: '#39ff14',
    description: 'Course completion and learning milestones'
  },
  community: {
    id: 'community',
    name: 'Community Champion',
    icon: '👥',
    color: '#00cc33',
    description: 'Social engagement and helpfulness'
  },
  milestones: {
    id: 'milestones',
    name: 'Major Milestones',
    icon: '🏆',
    color: '#ff4444',
    description: 'Significant platform achievements'
  },
  special: {
    id: 'special',
    name: 'Special Recognition',
    icon: '⭐',
    color: '#ffaa00',
    description: 'Rare and exclusive achievements'
  }
};

export const ACHIEVEMENTS = {
  // TRADING ACHIEVEMENTS
  'first-profit': {
    id: 'first-profit',
    title: 'First Blood',
    description: 'Made your first profitable trade',
    icon: '💰',
    category: 'trading',
    rarity: 'common',
    points: 50,
    requirements: {
      type: 'profit',
      threshold: 1
    },
    unlockedMessage: 'Congratulations! You\'ve made your first profit. The journey begins! 🚀'
  },
  
  'profit-100': {
    id: 'profit-100',
    title: 'Profit Hunter',
    description: 'Earned $100 in total profits',
    icon: '🎯',
    category: 'trading',
    rarity: 'common',
    points: 100,
    requirements: {
      type: 'total_earnings',
      threshold: 100
    }
  },

  'profit-1k': {
    id: 'profit-1k',
    title: 'Rising Trader',
    description: 'Earned $1,000 in total profits',
    icon: '📊',
    category: 'trading',
    rarity: 'uncommon',
    points: 250,
    requirements: {
      type: 'total_earnings',
      threshold: 1000
    }
  },

  'profit-10k': {
    id: 'profit-10k',
    title: 'Market Conqueror',
    description: 'Earned $10,000 in total profits',
    icon: '👑',
    category: 'trading',
    rarity: 'rare',
    points: 500,
    requirements: {
      type: 'total_earnings',
      threshold: 10000
    }
  },

  'profit-100k': {
    id: 'profit-100k',
    title: 'Wealth Builder',
    description: 'Earned $100,000 in total profits',
    icon: '💎',
    category: 'trading',
    rarity: 'epic',
    points: 1000,
    requirements: {
      type: 'total_earnings',
      threshold: 100000
    }
  },

  'profit-1m': {
    id: 'profit-1m',
    title: 'Millionaire Mindset',
    description: 'Earned $1,000,000 in total profits',
    icon: '🌟',
    category: 'trading',
    rarity: 'legendary',
    points: 2500,
    requirements: {
      type: 'total_earnings',
      threshold: 1000000
    }
  },

  'win-streak-5': {
    id: 'win-streak-5',
    title: 'Hot Streak',
    description: 'Won 5 trades in a row',
    icon: '🔥',
    category: 'trading',
    rarity: 'uncommon',
    points: 200,
    requirements: {
      type: 'win_streak',
      threshold: 5
    }
  },

  'win-streak-10': {
    id: 'win-streak-10',
    title: 'Unstoppable',
    description: 'Won 10 trades in a row',
    icon: '⚡',
    category: 'trading',
    rarity: 'rare',
    points: 400,
    requirements: {
      type: 'win_streak',
      threshold: 10
    }
  },

  // LEARNING ACHIEVEMENTS
  'first-course': {
    id: 'first-course',
    title: 'Student of the Game',
    description: 'Completed your first course',
    icon: '🎓',
    category: 'learning',
    rarity: 'common',
    points: 100,
    requirements: {
      type: 'courses_completed',
      threshold: 1
    }
  },

  'course-master': {
    id: 'course-master',
    title: 'Knowledge Collector',
    description: 'Completed 5 courses',
    icon: '📖',
    category: 'learning',
    rarity: 'uncommon',
    points: 300,
    requirements: {
      type: 'courses_completed',
      threshold: 5
    }
  },

  'learning-path': {
    id: 'learning-path',
    title: 'Dedicated Learner',
    description: 'Completed an entire learning path',
    icon: '🛤️',
    category: 'learning',
    rarity: 'rare',
    points: 500,
    requirements: {
      type: 'learning_paths_completed',
      threshold: 1
    }
  },

  'quiz-ace': {
    id: 'quiz-ace',
    title: 'Quiz Master',
    description: 'Scored 100% on 5 quizzes',
    icon: '🧠',
    category: 'learning',
    rarity: 'uncommon',
    points: 250,
    requirements: {
      type: 'perfect_quizzes',
      threshold: 5
    }
  },

  'speed-learner': {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Completed 3 courses in one week',
    icon: '⚡',
    category: 'learning',
    rarity: 'rare',
    points: 400,
    requirements: {
      type: 'courses_per_week',
      threshold: 3
    }
  },

  // COMMUNITY ACHIEVEMENTS
  'first-message': {
    id: 'first-message',
    title: 'Breaking the Ice',
    description: 'Sent your first message',
    icon: '💬',
    category: 'community',
    rarity: 'common',
    points: 25,
    requirements: {
      type: 'messages_sent',
      threshold: 1
    }
  },

  'chatty': {
    id: 'chatty',
    title: 'Conversation Starter',
    description: 'Sent 100 messages',
    icon: '🗣️',
    category: 'community',
    rarity: 'common',
    points: 100,
    requirements: {
      type: 'messages_sent',
      threshold: 100
    }
  },

  'helpful': {
    id: 'helpful',
    title: 'Helpful Member',
    description: 'Received 10 helpful reactions',
    icon: '🤝',
    category: 'community',
    rarity: 'uncommon',
    points: 200,
    requirements: {
      type: 'helpful_reactions',
      threshold: 10
    }
  },

  'mentor-candidate': {
    id: 'mentor-candidate',
    title: 'Future Mentor',
    description: 'Helped 5 new members',
    icon: '🎯',
    category: 'community',
    rarity: 'rare',
    points: 500,
    requirements: {
      type: 'helped_members',
      threshold: 5
    }
  },

  'social-butterfly': {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Active for 30 consecutive days',
    icon: '🦋',
    category: 'community',
    rarity: 'uncommon',
    points: 300,
    requirements: {
      type: 'consecutive_days',
      threshold: 30
    }
  },

  // MILESTONE ACHIEVEMENTS
  'welcome': {
    id: 'welcome',
    title: 'Welcome to E-Money',
    description: 'Joined the E-Money Society',
    icon: '🚪',
    category: 'milestones',
    rarity: 'common',
    points: 50,
    requirements: {
      type: 'joined',
      threshold: 1
    }
  },

  'level-up-profit': {
    id: 'level-up-profit',
    title: 'Profit Hunter Ascension',
    description: 'Reached Profit Hunter level',
    icon: '⬆️',
    category: 'milestones',
    rarity: 'uncommon',
    points: 200,
    requirements: {
      type: 'level',
      threshold: 'PROFIT_HUNTER'
    }
  },

  'level-up-crypto': {
    id: 'level-up-crypto',
    title: 'Crypto Master Ascension',
    description: 'Reached Crypto Master level',
    icon: '🔥',
    category: 'milestones',
    rarity: 'rare',
    points: 500,
    requirements: {
      type: 'level',
      threshold: 'CRYPTO_MASTER'
    }
  },

  'level-up-legend': {
    id: 'level-up-legend',
    title: 'Trading Legend Ascension',
    description: 'Reached Trading Legend level',
    icon: '👑',
    category: 'milestones',
    rarity: 'epic',
    points: 1000,
    requirements: {
      type: 'level',
      threshold: 'TRADING_LEGEND'
    }
  },

  'level-up-architect': {
    id: 'level-up-architect',
    title: 'Matrix Architect Ascension',
    description: 'Reached Matrix Architect level',
    icon: '🌟',
    category: 'milestones',
    rarity: 'legendary',
    points: 2500,
    requirements: {
      type: 'level',
      threshold: 'MATRIX_ARCHITECT'
    }
  },

  'anniversary': {
    id: 'anniversary',
    title: 'One Year Strong',
    description: 'Been a member for one year',
    icon: '🎂',
    category: 'milestones',
    rarity: 'rare',
    points: 500,
    requirements: {
      type: 'membership_days',
      threshold: 365
    }
  },

  // SPECIAL ACHIEVEMENTS
  'founder': {
    id: 'founder',
    title: 'Founding Member',
    description: 'Among the first 100 members',
    icon: '🏛️',
    category: 'special',
    rarity: 'legendary',
    points: 1000,
    requirements: {
      type: 'member_number',
      threshold: 100
    }
  },

  'early-adopter': {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'Joined in the first month',
    icon: '🌱',
    category: 'special',
    rarity: 'epic',
    points: 750,
    requirements: {
      type: 'early_member',
      threshold: 30
    }
  },

  'bug-hunter': {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Reported a critical bug',
    icon: '🐛',
    category: 'special',
    rarity: 'rare',
    points: 300,
    requirements: {
      type: 'bugs_reported',
      threshold: 1
    }
  },

  'feedback-hero': {
    id: 'feedback-hero',
    title: 'Feedback Hero',
    description: 'Provided valuable platform feedback',
    icon: '💡',
    category: 'special',
    rarity: 'uncommon',
    points: 200,
    requirements: {
      type: 'feedback_given',
      threshold: 5
    }
  }
};

export const RARITY_CONFIG = {
  common: {
    name: 'Common',
    color: '#00cc33',
    glow: '0 0 5px rgba(0, 204, 51, 0.3)',
    multiplier: 1
  },
  uncommon: {
    name: 'Uncommon',
    color: '#009900',
    glow: '0 0 8px rgba(0, 153, 0, 0.4)',
    multiplier: 1.5
  },
  rare: {
    name: 'Rare',
    color: '#00ff41',
    glow: '0 0 10px rgba(0, 255, 65, 0.5)',
    multiplier: 2
  },
  epic: {
    name: 'Epic',
    color: '#39ff14',
    glow: '0 0 12px rgba(57, 255, 20, 0.6)',
    multiplier: 3
  },
  legendary: {
    name: 'Legendary',
    color: '#ff4444',
    glow: '0 0 15px rgba(255, 68, 68, 0.7)',
    multiplier: 5
  }
};

// Helper functions
export const getUserAchievements = (userId) => {
  // Mock data - în production ar veni din backend
  const mockUserAchievements = {
    unlocked: [
      { id: 'welcome', unlockedAt: '2024-01-15T10:00:00Z' },
      { id: 'first-message', unlockedAt: '2024-01-15T10:30:00Z' },
      { id: 'first-profit', unlockedAt: '2024-01-16T14:22:00Z' },
      { id: 'first-course', unlockedAt: '2024-01-17T09:15:00Z' },
      { id: 'chatty', unlockedAt: '2024-01-20T16:45:00Z' },
      { id: 'profit-100', unlockedAt: '2024-01-22T11:30:00Z' }
    ],
    totalPoints: 525,
    nextToUnlock: ['profit-1k', 'course-master', 'helpful']
  };
  
  return mockUserAchievements;
};

export const checkAchievementProgress = (userId, achievementId) => {
  // Mock progress calculation
  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) return null;
  
  // Simulate current progress vs requirement
  const mockProgress = {
    'profit-1k': { current: 450, required: 1000, percentage: 45 },
    'course-master': { current: 2, required: 5, percentage: 40 },
    'helpful': { current: 3, required: 10, percentage: 30 },
    'win-streak-5': { current: 2, required: 5, percentage: 40 }
  };
  
  return mockProgress[achievementId] || { current: 0, required: achievement.requirements.threshold, percentage: 0 };
};

export const getAchievementsByCategory = (category) => {
  return Object.values(ACHIEVEMENTS).filter(achievement => achievement.category === category);
};

export const getRecentAchievements = (userId, limit = 5) => {
  const userAchievements = getUserAchievements(userId);
  return userAchievements.unlocked
    .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
    .slice(0, limit)
    .map(ua => ({
      ...ACHIEVEMENTS[ua.id],
      unlockedAt: ua.unlockedAt
    }));
};

export const calculateTotalPoints = (userId) => {
  const userAchievements = getUserAchievements(userId);
  return userAchievements.unlocked.reduce((total, ua) => {
    const achievement = ACHIEVEMENTS[ua.id];
    return total + (achievement ? achievement.points : 0);
  }, 0);
};

export const getProgressToNextLevel = (currentPoints) => {
  const levels = [
    { name: 'Rookie', points: 0, color: '#00cc33' },
    { name: 'Apprentice', points: 500, color: '#009900' },
    { name: 'Skilled', points: 1500, color: '#00ff41' },
    { name: 'Expert', points: 3000, color: '#39ff14' },
    { name: 'Master', points: 5000, color: '#ff4444' },
    { name: 'Grandmaster', points: 10000, color: '#ff4444' }
  ];
  
  let currentLevel = levels[0];
  let nextLevel = levels[1];
  
  for (let i = 0; i < levels.length - 1; i++) {
    if (currentPoints >= levels[i].points && currentPoints < levels[i + 1].points) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1];
      break;
    }
  }
  
  if (currentPoints >= levels[levels.length - 1].points) {
    currentLevel = levels[levels.length - 1];
    nextLevel = null;
  }
  
  const progress = nextLevel ? 
    ((currentPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100 : 100;
  
  return {
    currentLevel,
    nextLevel,
    progress: Math.min(progress, 100),
    pointsToNext: nextLevel ? nextLevel.points - currentPoints : 0
  };
};