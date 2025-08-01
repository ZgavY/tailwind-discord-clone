import React, { useState, useEffect } from 'react';
import ServerList from './components/ServerList';
import ChannelSidebar from './components/ChannelSidebar';
import MainContent from './components/MainContent';
import MembersList from './components/MembersList';
import MobileNav from './components/MobileNav';

function App() {
  const [showServers, setShowServers] = useState(false);
  const [showChannels, setShowChannels] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isRightSwipe && window.innerWidth < 768) {
      // Swipe right - open servers/channels
      if (!showServers && !showChannels && !showMembers) {
        setShowServers(true);
      } else if (showMembers) {
        setShowMembers(false);
      }
    }
    
    if (isLeftSwipe && window.innerWidth < 768) {
      // Swipe left - open members or close servers
      if (!showServers && !showChannels && !showMembers) {
        setShowMembers(true);
      } else if (showServers) {
        setShowServers(false);
      } else if (showChannels) {
        setShowChannels(false);
      }
    }
  };

  // Close all mobile menus on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowServers(false);
        setShowChannels(false);
        setShowMembers(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="flex h-screen bg-black text-green-500 font-mono text-xs overflow-hidden relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mobile Navigation Bar */}
      <div className="md:hidden">
        <MobileNav 
          onMenuClick={() => setShowServers(true)}
          onMembersClick={() => setShowMembers(!showMembers)}
          currentChannel="welcome"
        />
      </div>

      {/* Server List */}
      <div className={`
        fixed md:relative z-30 h-full
        transition-transform duration-300 ease-in-out
        ${showServers ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <ServerList onServerClick={() => {
          setShowServers(false);
          setShowChannels(true);
        }} />
      </div>

      {/* Channel Sidebar */}
      <div className={`
        fixed md:relative z-20 h-full
        transition-transform duration-300 ease-in-out
        ${showChannels ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <ChannelSidebar onChannelClick={() => setShowChannels(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <MainContent />
      </div>

      {/* Members List */}
      <div className={`
        fixed md:relative right-0 z-20 h-full
        transition-transform duration-300 ease-in-out
        ${showMembers ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <MembersList />
      </div>

      {/* Overlay pentru mobile */}
      {(showServers || showChannels || showMembers) && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => {
            setShowServers(false);
            setShowChannels(false);
            setShowMembers(false);
          }}
        />
      )}

      {/* Swipe hints pentru mobile */}
      {window.innerWidth < 768 && !showServers && !showChannels && !showMembers && (
        <>
          <div className="fixed left-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-30 animate-pulse md:hidden" />
          <div className="fixed right-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-30 animate-pulse md:hidden" />
        </>
      )}
    </div>
  );
}

export default App;