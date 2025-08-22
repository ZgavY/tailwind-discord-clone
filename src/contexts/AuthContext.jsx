import React, { createContext, useContext, useState } from 'react';

// Mock users pentru development
const MOCK_USERS = [
  {
    id: 1,
    username: 'root@emoney',
    displayName: 'System Admin',
    role: 'admin',
    avatar: 'R',
    color: '#ff4444',
    status: 'online',
    bio: 'Founder & CEO of E-Money Society. Building the future of financial education.',
    joinDate: '2023-01-01',
    totalEarnings: 2500000,
    level: 'MATRIX_ARCHITECT',
    badges: ['founder', 'verified', 'trader_pro'],
    permissions: ['*']
  },
  {
    id: 2,
    username: 'cryptoguru',
    displayName: 'CryptoGuru',
    role: 'mentor',
    avatar: 'C',
    color: '#00ff41',
    status: 'online',
    bio: 'Professional crypto trader. Teaching advanced DeFi strategies.',
    joinDate: '2023-02-15',
    totalEarnings: 850000,
    level: 'CRYPTO_MASTER',
    badges: ['verified', 'mentor', 'defi_expert'],
    permissions: ['mentor_channels', 'moderate', 'voice_channels']
  },
  {
    id: 3,
    username: 'tradingmaster',
    displayName: 'TradingMaster',
    role: 'mentor', 
    avatar: 'T',
    color: '#39ff14',
    status: 'away',
    bio: 'Ex-Wall Street trader. Specializing in technical analysis and risk management.',
    joinDate: '2023-03-01',
    totalEarnings: 1200000,
    level: 'TRADING_LEGEND',
    badges: ['verified', 'mentor', 'wall_street'],
    permissions: ['mentor_channels', 'moderate', 'voice_channels']
  },
  {
    id: 4,
    username: 'newbie2024',
    displayName: 'CryptoNewbie',
    role: 'member',
    avatar: 'N',
    color: '#00cc33',
    status: 'online',
    bio: 'New to crypto, eager to learn and grow in the community.',
    joinDate: '2024-01-15',
    totalEarnings: 5500,
    level: 'ROOKIE_TRADER',
    badges: ['new_member'],
    permissions: ['general_channels']
  },
  {
    id: 5,
    username: 'daytrader99',
    displayName: 'DayTrader99',
    role: 'member',
    avatar: 'D',
    color: '#009900',
    status: 'dnd',
    bio: 'Day trader focusing on scalping strategies. Active community member.',
    joinDate: '2023-08-10',
    totalEarnings: 75000,
    level: 'PROFIT_HUNTER',
    badges: ['active_trader', 'community_star'],
    permissions: ['general_channels', 'advanced_channels']
  }
];

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Start cu primul user (admin)
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (userId) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const switchUser = (userId) => {
    return login(userId);
  };

  const value = {
    currentUser,
    isAuthenticated,
    mockUsers: MOCK_USERS,
    login,
    logout,
    switchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;