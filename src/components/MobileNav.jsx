import React from 'react';

const MobileNav = ({ onMenuClick, onMembersClick, currentChannel }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gray-900 border-b border-green-500/30 flex items-center justify-between px-4 z-40 md:hidden">
      {/* Menu button */}
      <button 
        onClick={onMenuClick}
        className="text-green-500 p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Channel name */}
      <div className="flex items-center text-green-500">
        <span className="mr-2">#</span>
        <span className="font-bold">{currentChannel}</span>
      </div>

      {/* Members button */}
      <button 
        onClick={onMembersClick}
        className="text-green-500 p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </div>
  );
};

export default MobileNav;