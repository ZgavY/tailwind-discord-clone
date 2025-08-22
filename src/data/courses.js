// E-Money Society Course Structure
// Premium educational content for financial education

export const COURSE_CATEGORIES = {
  basics: {
    id: 'basics',
    name: 'Trading Fundamentals',
    description: 'Essential knowledge for starting your trading journey',
    icon: '📚',
    color: '#00cc33',
    requiredLevel: 'ROOKIE_TRADER',
    order: 1
  },
  advanced: {
    id: 'advanced', 
    name: 'Advanced Strategies',
    description: 'Professional trading techniques and risk management',
    icon: '🚀',
    color: '#009900',
    requiredLevel: 'PROFIT_HUNTER',
    order: 2
  },
  defi: {
    id: 'defi',
    name: 'DeFi Mastery',
    description: 'Decentralized finance protocols and yield farming',
    icon: '⚡',
    color: '#00ff41',
    requiredLevel: 'PROFIT_HUNTER',
    order: 3
  },
  psychology: {
    id: 'psychology',
    name: 'Trading Psychology',
    description: 'Mental frameworks for consistent trading success',
    icon: '🧠',
    color: '#39ff14',
    requiredLevel: 'CRYPTO_MASTER',
    order: 4
  }
};

export const COURSES = {
  // BASICS CATEGORY
  'trading-101': {
    id: 'trading-101',
    title: 'Trading 101: Complete Beginner Guide',
    description: 'Learn the fundamentals of financial markets and trading',
    category: 'basics',
    instructor: 'CryptoGuru',
    duration: '4 hours',
    lessons: 12,
    difficulty: 'Beginner',
    price: 0, // Free pentru members
    thumbnail: '📈',
    tags: ['trading', 'basics', 'markets', 'beginner'],
    requiredLevel: 'ROOKIE_TRADER',
    status: 'published',
    rating: 4.8,
    students: 1250,
    lastUpdated: '2024-01-15',
    outline: [
      {
        id: 1,
        title: 'What is Trading?',
        duration: '15 min',
        type: 'video',
        isPreview: true
      },
      {
        id: 2,
        title: 'Market Basics & Terminology',
        duration: '20 min',
        type: 'video'
      },
      {
        id: 3,
        title: 'Reading Charts - Candlesticks',
        duration: '25 min',
        type: 'video'
      },
      {
        id: 4,
        title: 'Support & Resistance',
        duration: '30 min',
        type: 'video'
      },
      {
        id: 5,
        title: 'Trading Psychology Basics',
        duration: '20 min',
        type: 'video'
      },
      {
        id: 6,
        title: 'Quiz: Fundamentals',
        duration: '10 min',
        type: 'quiz'
      }
    ]
  },

  'risk-management': {
    id: 'risk-management',
    title: 'Risk Management Mastery',
    description: 'Protect your capital with professional risk management techniques',
    category: 'basics',
    instructor: 'TradingMaster',
    duration: '3 hours',
    lessons: 8,
    difficulty: 'Intermediate',
    price: 0,
    thumbnail: '🛡️',
    tags: ['risk', 'management', 'capital', 'protection'],
    requiredLevel: 'ROOKIE_TRADER',
    status: 'published',
    rating: 4.9,
    students: 980,
    lastUpdated: '2024-01-10'
  },

  // ADVANCED CATEGORY
  'scalping-strategies': {
    id: 'scalping-strategies',
    title: 'Professional Scalping Strategies',
    description: 'High-frequency trading techniques for quick profits',
    category: 'advanced',
    instructor: 'DayTrader99',
    duration: '6 hours',
    lessons: 15,
    difficulty: 'Advanced',
    price: 0,
    thumbnail: '⚡',
    tags: ['scalping', 'day-trading', 'short-term', 'advanced'],
    requiredLevel: 'PROFIT_HUNTER',
    status: 'published',
    rating: 4.7,
    students: 450,
    lastUpdated: '2024-01-12'
  },

  'algo-trading': {
    id: 'algo-trading',
    title: 'Algorithmic Trading with Python',
    description: 'Build automated trading systems and backtesting strategies',
    category: 'advanced',
    instructor: 'System Admin',
    duration: '12 hours',
    lessons: 25,
    difficulty: 'Expert',
    price: 0,
    thumbnail: '🤖',
    tags: ['algorithmic', 'python', 'automation', 'coding'],
    requiredLevel: 'CRYPTO_MASTER',
    status: 'coming-soon',
    rating: null,
    students: 0,
    lastUpdated: '2024-01-20'
  },

  // DEFI CATEGORY
  'defi-fundamentals': {
    id: 'defi-fundamentals',
    title: 'DeFi Fundamentals & Protocols',
    description: 'Understanding decentralized finance and major protocols',
    category: 'defi',
    instructor: 'CryptoGuru',
    duration: '8 hours',
    lessons: 20,
    difficulty: 'Intermediate',
    price: 0,
    thumbnail: '🏛️',
    tags: ['defi', 'protocols', 'ethereum', 'smart-contracts'],
    requiredLevel: 'PROFIT_HUNTER',
    status: 'published',
    rating: 4.8,
    students: 650,
    lastUpdated: '2024-01-08'
  },

  'yield-farming': {
    id: 'yield-farming',
    title: 'Advanced Yield Farming Strategies',
    description: 'Maximize returns through sophisticated yield farming techniques',
    category: 'defi',
    instructor: 'CryptoGuru',
    duration: '5 hours',
    lessons: 12,
    difficulty: 'Advanced',
    price: 0,
    thumbnail: '🌾',
    tags: ['yield-farming', 'liquidity', 'staking', 'rewards'],
    requiredLevel: 'CRYPTO_MASTER',
    status: 'published',
    rating: 4.9,
    students: 320,
    lastUpdated: '2024-01-05'
  },

  // PSYCHOLOGY CATEGORY
  'trading-mindset': {
    id: 'trading-mindset',
    title: 'The Millionaire Trading Mindset',
    description: 'Develop the psychology of successful professional traders',
    category: 'psychology',
    instructor: 'TradingMaster',
    duration: '4 hours',
    lessons: 10,
    difficulty: 'All Levels',
    price: 0,
    thumbnail: '💎',
    tags: ['psychology', 'mindset', 'discipline', 'emotions'],
    requiredLevel: 'CRYPTO_MASTER',
    status: 'published',
    rating: 5.0,
    students: 850,
    lastUpdated: '2024-01-01'
  }
};

export const LEARNING_PATHS = {
  'beginner-to-pro': {
    id: 'beginner-to-pro',
    title: 'Beginner to Professional Trader',
    description: 'Complete learning path from zero to professional trading',
    duration: '20+ hours',
    courses: ['trading-101', 'risk-management', 'scalping-strategies', 'trading-mindset'],
    difficulty: 'Progressive',
    icon: '🎯',
    color: '#00ff41'
  },
  'defi-specialist': {
    id: 'defi-specialist',
    title: 'DeFi Specialist Track',
    description: 'Become an expert in decentralized finance',
    duration: '15+ hours', 
    courses: ['trading-101', 'defi-fundamentals', 'yield-farming'],
    difficulty: 'Intermediate to Advanced',
    icon: '⚡',
    color: '#39ff14'
  },
  'algo-master': {
    id: 'algo-master',
    title: 'Algorithmic Trading Master',
    description: 'Master automated trading and system development',
    duration: '25+ hours',
    courses: ['trading-101', 'risk-management', 'algo-trading'],
    difficulty: 'Advanced to Expert',
    icon: '🤖',
    color: '#ff4444'
  }
};

// Helper functions
export const getCoursesByCategory = (categoryId) => {
  return Object.values(COURSES).filter(course => course.category === categoryId);
};

export const getCoursesByLevel = (userLevel) => {
  const levelOrder = {
    'ROOKIE_TRADER': 1,
    'PROFIT_HUNTER': 2, 
    'CRYPTO_MASTER': 3,
    'TRADING_LEGEND': 4,
    'MATRIX_ARCHITECT': 5
  };
  
  const userLevelNum = levelOrder[userLevel] || 0;
  
  return Object.values(COURSES).filter(course => {
    const courseLevelNum = levelOrder[course.requiredLevel] || 0;
    return courseLevelNum <= userLevelNum;
  });
};

export const getUserProgress = (userId, courseId) => {
  // Mock progress data - în production ar veni din backend
  const mockProgress = {
    'trading-101': { completed: 4, total: 12, percentage: 33 },
    'risk-management': { completed: 8, total: 8, percentage: 100 },
    'scalping-strategies': { completed: 2, total: 15, percentage: 13 }
  };
  
  return mockProgress[courseId] || { completed: 0, total: 0, percentage: 0 };
};

export const getRecommendedCourses = (user) => {
  const userCourses = getCoursesByLevel(user.level);
  // Logic pentru recomandări based on user progress și interese
  return userCourses.slice(0, 3);
};