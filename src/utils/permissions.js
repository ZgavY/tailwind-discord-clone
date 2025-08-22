// E-Money Society Permission System
// Premium platform cu acces bazat pe role și level

export const CHANNELS = {
  // Public channels - toate rolurile
  welcome: {
    id: 'welcome',
    name: 'welcome',
    icon: '🏠',
    description: 'Welcome to E-Money Society',
    requiredPermissions: [],
    requiredLevel: null,
    category: 'general'
  },
  rules: {
    id: 'rules',
    name: 'rules',
    icon: '📋',
    description: 'Community rules and guidelines',
    requiredPermissions: [],
    requiredLevel: null,
    category: 'general'
  },
  
  // Basic learning channels - members+
  basics: {
    id: 'basics',
    name: 'basics',
    icon: '📚',
    description: 'Trading & crypto fundamentals',
    requiredPermissions: ['general_channels'],
    requiredLevel: 'ROOKIE_TRADER',
    category: 'education'
  },
  general: {
    id: 'general',
    name: 'general',
    icon: '💬',
    description: 'General discussion',
    requiredPermissions: ['general_channels'],
    requiredLevel: 'ROOKIE_TRADER',
    category: 'social'
  },
  
  // Advanced channels - experienced members
  advanced: {
    id: 'advanced',
    name: 'advanced',
    icon: '🚀',
    description: 'Advanced trading strategies',
    requiredPermissions: ['advanced_channels'],
    requiredLevel: 'PROFIT_HUNTER',
    category: 'education'
  },
  defi: {
    id: 'defi',
    name: 'defi',
    icon: '⚡',
    description: 'DeFi protocols and yield farming',
    requiredPermissions: ['advanced_channels'],
    requiredLevel: 'PROFIT_HUNTER',
    category: 'education'
  },
  
  // Mentor channels - mentors only
  'mentor-lounge': {
    id: 'mentor-lounge',
    name: 'mentor-lounge',
    icon: '👑',
    description: 'Private mentor discussions',
    requiredPermissions: ['mentor_channels'],
    requiredLevel: 'CRYPTO_MASTER',
    category: 'mentor'
  },
  'strategy-lab': {
    id: 'strategy-lab',
    name: 'strategy-lab',
    icon: '🔬',
    description: 'Strategy development and testing',
    requiredPermissions: ['mentor_channels'],
    requiredLevel: 'CRYPTO_MASTER',
    category: 'mentor'
  },
  
  // Admin channels - admin only
  'admin-control': {
    id: 'admin-control',
    name: 'admin-control',
    icon: '⚙️',
    description: 'Platform administration',
    requiredPermissions: ['*'],
    requiredLevel: 'MATRIX_ARCHITECT',
    category: 'admin'
  }
};

export const USER_LEVELS = {
  ROOKIE_TRADER: {
    name: 'Rookie Trader',
    minEarnings: 0,
    color: '#00cc33',
    permissions: ['general_channels']
  },
  PROFIT_HUNTER: {
    name: 'Profit Hunter', 
    minEarnings: 50000,
    color: '#009900',
    permissions: ['general_channels', 'advanced_channels']
  },
  CRYPTO_MASTER: {
    name: 'Crypto Master',
    minEarnings: 500000,
    color: '#00ff41',
    permissions: ['general_channels', 'advanced_channels', 'mentor_channels']
  },
  TRADING_LEGEND: {
    name: 'Trading Legend',
    minEarnings: 1000000,
    color: '#39ff14',
    permissions: ['general_channels', 'advanced_channels', 'mentor_channels']
  },
  MATRIX_ARCHITECT: {
    name: 'Matrix Architect',
    minEarnings: 2000000,
    color: '#ff4444',
    permissions: ['*']
  }
};

export const ROLE_PERMISSIONS = {
  member: {
    basePermissions: ['general_channels'],
    canAccess: (channel, user) => {
      // Members pot accesa doar canale based on level
      if (!channel.requiredPermissions.length) return true;
      
      const userLevel = USER_LEVELS[user.level];
      if (!userLevel) return false;
      
      // Check if user level has required permissions
      return channel.requiredPermissions.every(perm => 
        userLevel.permissions.includes(perm) || userLevel.permissions.includes('*')
      );
    }
  },
  mentor: {
    basePermissions: ['general_channels', 'advanced_channels', 'mentor_channels', 'moderate', 'voice_channels'],
    canAccess: (channel, user) => {
      // Mentors pot accesa toate canale except admin
      if (channel.category === 'admin') return false;
      return true;
    }
  },
  admin: {
    basePermissions: ['*'],
    canAccess: (channel, user) => {
      // Admins pot accesa toate
      return true;
    }
  }
};

// Helper functions
export const canUserAccessChannel = (user, channelId) => {
  const channel = CHANNELS[channelId];
  if (!channel) return false;
  
  const rolePermissions = ROLE_PERMISSIONS[user.role];
  if (!rolePermissions) return false;
  
  return rolePermissions.canAccess(channel, user);
};

export const getUserAccessibleChannels = (user) => {
  return Object.values(CHANNELS).filter(channel => 
    canUserAccessChannel(user, channel.id)
  );
};

export const getChannelsByCategory = (user) => {
  const accessibleChannels = getUserAccessibleChannels(user);
  
  const categories = {
    general: [],
    social: [],
    education: [],
    mentor: [],
    admin: []
  };
  
  accessibleChannels.forEach(channel => {
    if (categories[channel.category]) {
      categories[channel.category].push(channel);
    }
  });
  
  return categories;
};

export const hasPermission = (user, permission) => {
  const rolePermissions = ROLE_PERMISSIONS[user.role];
  if (!rolePermissions) return false;
  
  return rolePermissions.basePermissions.includes(permission) || 
         rolePermissions.basePermissions.includes('*');
};