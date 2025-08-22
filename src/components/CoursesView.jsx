import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { COURSES, COURSE_CATEGORIES, LEARNING_PATHS, getCoursesByCategory, getCoursesByLevel, getRecommendedCourses } from '../data/courses';
import CourseCard from './CourseCard';

const CoursesView = ({ selectedChannel }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('recommended');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recommendedCourses = getRecommendedCourses(currentUser);
  const userCourses = getCoursesByLevel(currentUser.level);

  const getFilteredCourses = () => {
    switch (activeTab) {
      case 'recommended':
        return recommendedCourses;
      case 'my-courses':
        // Return courses with progress
        return userCourses.filter(course => {
          // Mock check for courses with progress
          return ['trading-101', 'risk-management', 'scalping-strategies'].includes(course.id);
        });
      case 'all':
        if (selectedCategory === 'all') {
          return userCourses;
        }
        return getCoursesByCategory(selectedCategory).filter(course => 
          userCourses.some(uc => uc.id === course.id)
        );
      default:
        return userCourses;
    }
  };

  const filteredCourses = getFilteredCourses();

  if (selectedChannel !== 'basics') {
    return null; // Doar în basics channel
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-discord-green mb-2">📚 E-Money Academy</h1>
        <p className="text-discord-text-muted">Master trading and cryptocurrency with premium courses</p>
        
        {/* User progress stats */}
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="text-center">
            <div className="text-discord-green font-bold text-lg">12</div>
            <div className="text-discord-text-muted">Courses Available</div>
          </div>
          <div className="text-center">
            <div className="text-discord-green font-bold text-lg">3</div>
            <div className="text-discord-text-muted">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-discord-green font-bold text-lg">1</div>
            <div className="text-discord-text-muted">Completed</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-discord-main rounded-lg p-1">
        {[
          { id: 'recommended', name: '🎯 Recommended', icon: '' },
          { id: 'my-courses', name: '📖 My Courses', icon: '' },
          { id: 'all', name: '🌟 All Courses', icon: '' },
          { id: 'paths', name: '🛤️ Learning Paths', icon: '' }
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

      {/* Category filter (for all courses tab) */}
      {activeTab === 'all' && (
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
          {Object.values(COURSE_CATEGORIES).map(category => (
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
      )}

      {/* Learning Paths Tab */}
      {activeTab === 'paths' && (
        <div className="grid gap-6">
          {Object.values(LEARNING_PATHS).map(path => (
            <div key={path.id} className="bg-discord-secondary border border-discord-border rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{path.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-discord-green mb-2">{path.title}</h3>
                  <p className="text-discord-text-muted mb-4">{path.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-discord-text-dark">Duration:</span>
                      <span className="text-discord-green font-medium ml-2">{path.duration}</span>
                    </div>
                    <div>
                      <span className="text-discord-text-dark">Difficulty:</span>
                      <span className="text-discord-green font-medium ml-2">{path.difficulty}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {path.courses.map(courseId => {
                      const course = COURSES[courseId];
                      return course ? (
                        <span key={courseId} className="px-2 py-1 bg-discord-main/50 rounded text-xs text-discord-green">
                          {course.thumbnail} {course.title}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-discord-green text-discord-dark rounded-lg font-medium hover:bg-discord-green-bright transition-all">
                  Start Path
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Courses Grid */}
      {activeTab !== 'paths' && (
        <>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-discord-green mb-2">No courses found</h3>
              <p className="text-discord-text-muted">
                {activeTab === 'my-courses' 
                  ? 'Start learning to see your courses here'
                  : 'Try adjusting your filters or check back later'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => {
                    // Handle course click - ar deschide course player
                    console.log('Opening course:', course.title);
                  }}
                />
              ))}
            </div>
          )}

          {/* Quick stats footer */}
          <div className="mt-8 p-4 bg-discord-main/30 rounded-lg border border-discord-border/30">
            <div className="flex items-center justify-between text-sm">
              <div className="text-discord-text-muted">
                Showing {filteredCourses.length} courses • Level: <span className="text-discord-green">{currentUser.level.replace('_', ' ')}</span>
              </div>
              <div className="text-discord-text-muted">
                Total learning time: <span className="text-discord-green">50+ hours</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesView;