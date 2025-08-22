import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProgress, COURSE_CATEGORIES } from '../data/courses';

const CourseCard = ({ course, onClick, isCompact = false }) => {
  const { currentUser } = useAuth();
  const progress = getUserProgress(currentUser.id, course.id);
  const category = COURSE_CATEGORIES[course.category];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': '#00cc33',
      'Intermediate': '#009900', 
      'Advanced': '#00ff41',
      'Expert': '#ff4444',
      'All Levels': '#39ff14'
    };
    return colors[difficulty] || '#00ff41';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'published': { text: 'Available', color: '#00ff41', bg: 'bg-green-500/20' },
      'coming-soon': { text: 'Coming Soon', color: '#ffaa00', bg: 'bg-yellow-500/20' },
      'draft': { text: 'Draft', color: '#666666', bg: 'bg-gray-500/20' }
    };
    return badges[status] || badges.published;
  };

  const formatDuration = (duration) => {
    return duration.replace('hours', 'h').replace('hour', 'h');
  };

  if (isCompact) {
    return (
      <div 
        onClick={onClick}
        className="bg-discord-secondary border border-discord-border rounded-lg p-4 cursor-pointer hover:bg-discord-hover/10 transition-all group"
      >
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{course.thumbnail}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-discord-green text-sm truncate group-hover:text-discord-green-bright">
              {course.title}
            </h3>
            <p className="text-xs text-discord-text-muted">{course.instructor} • {formatDuration(course.duration)}</p>
            {progress.total > 0 && (
              <div className="mt-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-discord-main rounded-full h-1">
                    <div 
                      className="bg-discord-green h-1 rounded-full transition-all"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-discord-green">{progress.percentage}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="bg-discord-secondary border border-discord-border rounded-xl overflow-hidden cursor-pointer hover:border-discord-green/30 transition-all group shadow-lg hover:shadow-xl"
    >
      {/* Header with thumbnail and status */}
      <div className="relative p-6 pb-4" style={{ backgroundColor: `${category?.color}20` }}>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{course.thumbnail}</div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(course.status).bg}`}>
            <span style={{ color: getStatusBadge(course.status).color }}>
              {getStatusBadge(course.status).text}
            </span>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-6">
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium bg-black/30 backdrop-blur-sm"
            style={{ color: category?.color }}
          >
            {category?.icon} {category?.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        <h3 className="font-bold text-discord-green text-lg mb-2 group-hover:text-discord-green-bright transition-colors">
          {course.title}
        </h3>
        
        <p className="text-discord-text-muted text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Course info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
          <div>
            <span className="text-discord-text-dark">Instructor:</span>
            <div className="text-discord-green font-medium">{course.instructor}</div>
          </div>
          <div>
            <span className="text-discord-text-dark">Duration:</span>
            <div className="text-discord-green font-medium">{formatDuration(course.duration)}</div>
          </div>
          <div>
            <span className="text-discord-text-dark">Lessons:</span>
            <div className="text-discord-green font-medium">{course.lessons} lessons</div>
          </div>
          <div>
            <span className="text-discord-text-dark">Difficulty:</span>
            <div className="font-medium" style={{ color: getDifficultyColor(course.difficulty) }}>
              {course.difficulty}
            </div>
          </div>
        </div>

        {/* Progress bar (if user has progress) */}
        {progress.total > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-discord-text-muted">Progress</span>
              <span className="text-xs text-discord-green font-medium">{progress.completed}/{progress.total}</span>
            </div>
            <div className="bg-discord-main rounded-full h-2">
              <div 
                className="bg-discord-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags?.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-discord-main/50 rounded text-xs text-discord-text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between pt-4 border-t border-discord-border/30">
          <div className="flex items-center space-x-4 text-xs text-discord-text-muted">
            {course.rating && (
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{course.rating}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <span>👥</span>
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="text-xs text-discord-text-dark">
            Updated {new Date(course.lastUpdated).toLocaleDateString('ro-RO', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;