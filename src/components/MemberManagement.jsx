import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../utils/permissions';
import StatusIndicator from './StatusIndicator';
import UserProfile from './UserProfile';

const MemberManagement = ({ selectedChannel }) => {
  const { currentUser, mockUsers } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Check if user has access to this feature
  if (!hasPermission(currentUser, 'moderate') && currentUser.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Access Denied</h3>
          <p className="text-discord-text-muted">Only mentors and admins can access member management.</p>
        </div>
      </div>
    );
  }

  // Filter members based on search and filters
  const filteredMembers = mockUsers.filter(member => {
    const matchesSearch = member.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate platform stats
  const stats = {
    totalMembers: mockUsers.length,
    onlineMembers: mockUsers.filter(u => u.status === 'online').length,
    totalEarnings: mockUsers.reduce((sum, u) => sum + u.totalEarnings, 0),
    avgEarnings: mockUsers.reduce((sum, u) => sum + u.totalEarnings, 0) / mockUsers.length,
    newMembers: mockUsers.filter(u => new Date(u.joinDate) > new Date('2024-01-01')).length,
    mentors: mockUsers.filter(u => u.role === 'mentor').length,
    admins: mockUsers.filter(u => u.role === 'admin').length
  };

  const formatEarnings = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount}`;
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: '#ff4444',
      mentor: '#00ff41',
      member: '#00cc33'
    };
    return colors[role] || '#00cc33';
  };

  const getBadgeIcon = (badge) => {
    const badges = {
      founder: '👑',
      verified: '✅',
      trader_pro: '📈',
      mentor: '🎯',
      defi_expert: '⚡',
      wall_street: '🏛️',
      new_member: '🌱',
      active_trader: '💎',
      community_star: '⭐'
    };
    return badges[badge] || '🏆';
  };

  if (selectedChannel !== 'admin-control' && selectedChannel !== 'mentor-lounge') {
    return null; // Only show in admin/mentor channels
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-discord-green mb-2">
            {currentUser.role === 'admin' ? '⚙️ Admin Dashboard' : '🎯 Mentor Panel'}
          </h1>
          <p className="text-discord-text-muted">
            {currentUser.role === 'admin' 
              ? 'Platform administration and member management'
              : 'Mentor tools and member oversight'
            }
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-discord-text-muted">Logged in as</div>
          <div className="font-bold text-discord-green">{currentUser.displayName}</div>
          <div className="text-xs" style={{ color: getRoleColor(currentUser.role) }}>
            {currentUser.role.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-discord-main rounded-lg p-1">
        {[
          { id: 'overview', name: '📊 Overview', roles: ['admin', 'mentor'] },
          { id: 'members', name: '👥 Members', roles: ['admin', 'mentor'] },
          { id: 'moderation', name: '🛡️ Moderation', roles: ['admin', 'mentor'] },
          { id: 'analytics', name: '📈 Analytics', roles: ['admin'] },
          { id: 'settings', name: '⚙️ Settings', roles: ['admin'] }
        ].filter(tab => tab.roles.includes(currentUser.role)).map(tab => (
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
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-2xl font-bold text-discord-green">{stats.totalMembers}</div>
              <div className="text-sm text-discord-text-muted">Total Members</div>
            </div>
            <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
              <div className="text-2xl mb-2">🟢</div>
              <div className="text-2xl font-bold text-discord-green">{stats.onlineMembers}</div>
              <div className="text-sm text-discord-text-muted">Online Now</div>
            </div>
            <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-2xl font-bold text-discord-green">{formatEarnings(stats.totalEarnings)}</div>
              <div className="text-sm text-discord-text-muted">Total Earnings</div>
            </div>
            <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-2xl font-bold text-discord-green">{formatEarnings(stats.avgEarnings)}</div>
              <div className="text-sm text-discord-text-muted">Avg Earnings</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-discord-secondary border border-discord-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-discord-green mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-discord-main rounded-lg hover:bg-discord-hover/20 transition-all text-center">
                <div className="text-2xl mb-2">📢</div>
                <div className="text-sm text-discord-green">Send Announcement</div>
              </button>
              <button className="p-4 bg-discord-main rounded-lg hover:bg-discord-hover/20 transition-all text-center">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm text-discord-green">Add Member</div>
              </button>
              <button className="p-4 bg-discord-main rounded-lg hover:bg-discord-hover/20 transition-all text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm text-discord-green">View Reports</div>
              </button>
              <button className="p-4 bg-discord-main rounded-lg hover:bg-discord-hover/20 transition-all text-center">
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm text-discord-green">Platform Settings</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-discord-secondary border border-discord-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-discord-green mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New member joined', user: 'CryptoNewbie', time: '2 minutes ago', type: 'join' },
                { action: 'Course completed', user: 'DayTrader99', time: '15 minutes ago', type: 'course' },
                { action: 'Level up achieved', user: 'InvestorPro', time: '1 hour ago', type: 'level' },
                { action: 'Message reported', user: 'Unknown', time: '2 hours ago', type: 'report' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-discord-main/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">
                      {activity.type === 'join' && '🟢'}
                      {activity.type === 'course' && '📚'}
                      {activity.type === 'level' && '⬆️'}
                      {activity.type === 'report' && '⚠️'}
                    </div>
                    <div>
                      <div className="text-sm text-discord-text-white">{activity.action}</div>
                      <div className="text-xs text-discord-text-muted">{activity.user}</div>
                    </div>
                  </div>
                  <div className="text-xs text-discord-text-muted">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-discord-secondary border border-discord-border rounded-lg p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-discord-main border border-discord-border rounded-lg px-3 py-2 text-discord-text-white focus:border-discord-green focus:outline-none"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-discord-main border border-discord-border rounded-lg px-3 py-2 text-discord-text-white focus:border-discord-green focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="mentor">Mentor</option>
                <option value="member">Member</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-discord-main border border-discord-border rounded-lg px-3 py-2 text-discord-text-white focus:border-discord-green focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="dnd">Do Not Disturb</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-discord-secondary border border-discord-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-discord-border/30">
              <h3 className="font-bold text-discord-green">Members ({filteredMembers.length})</h3>
            </div>
            <div className="divide-y divide-discord-border/30">
              {filteredMembers.map(member => (
                <div key={member.id} className="p-4 hover:bg-discord-main/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                          style={{ backgroundColor: member.color }}
                        >
                          {member.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          <StatusIndicator status={member.status} size="sm" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-discord-green">{member.displayName}</span>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${getRoleColor(member.role)}20`,
                              color: getRoleColor(member.role)
                            }}
                          >
                            {member.role.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-discord-text-muted">
                          @{member.username} • {member.level.replace('_', ' ')} • {formatEarnings(member.totalEarnings)}
                        </div>
                        <div className="flex space-x-1 mt-1">
                          {member.badges.slice(0, 3).map(badge => (
                            <span key={badge} className="text-xs">
                              {getBadgeIcon(badge)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedMember(member.id)}
                        className="px-3 py-1 bg-discord-green/20 text-discord-green rounded-lg text-sm hover:bg-discord-green/30 transition-all"
                      >
                        View Profile
                      </button>
                      {currentUser.role === 'admin' && member.role !== 'admin' && (
                        <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all">
                          Manage
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Moderation Tab */}
      {activeTab === 'moderation' && (
        <div className="bg-discord-secondary border border-discord-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-discord-green mb-4">🛡️ Moderation Tools</h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🚧</div>
            <h4 className="text-xl font-bold text-discord-green mb-2">Coming Soon</h4>
            <p className="text-discord-text-muted">Advanced moderation tools are being developed.</p>
          </div>
        </div>
      )}

      {/* Analytics Tab (Admin Only) */}
      {activeTab === 'analytics' && currentUser.role === 'admin' && (
        <div className="bg-discord-secondary border border-discord-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-discord-green mb-4">📈 Platform Analytics</h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-xl font-bold text-discord-green mb-2">Analytics Dashboard</h4>
            <p className="text-discord-text-muted">Detailed platform metrics and insights coming soon.</p>
          </div>
        </div>
      )}

      {/* Settings Tab (Admin Only) */}
      {activeTab === 'settings' && currentUser.role === 'admin' && (
        <div className="bg-discord-secondary border border-discord-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-discord-green mb-4">⚙️ Platform Settings</h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🔧</div>
            <h4 className="text-xl font-bold text-discord-green mb-2">System Configuration</h4>
            <p className="text-discord-text-muted">Platform settings and configuration tools coming soon.</p>
          </div>
        </div>
      )}

      {/* Member Profile Modal */}
      {selectedMember && (
        <UserProfile 
          userId={selectedMember} 
          isModal={true} 
          onClose={() => setSelectedMember(null)} 
        />
      )}
    </div>
  );
};

export default MemberManagement;