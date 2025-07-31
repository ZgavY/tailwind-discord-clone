// src/components/EMoneyPlatform.jsx
import React, { useState, useEffect } from 'react';
import ServerList from './ServerList';
import ChannelSidebar from './ChannelSidebar';
import MainContent from './MainContent';
import MemberList from './MemberList';

const EMoneyPlatform = () => {
  const [activeChannel, setActiveChannel] = useState('welcome');
  const [typingText, setTypingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const courses = [
    { id: 1, name: 'Crypto Trading', icon: '₿', active: true },
    { id: 2, name: 'Forex Mastery', icon: '💱', active: false },
    { id: 3, name: 'Stock Market', icon: '📈', active: false },
    { id: 4, name: 'Dropshipping', icon: '📦', active: false },
    { id: 5, name: 'NFT Flipping', icon: '🎨', active: false },
  ];

  const channels = {
    welcome: [
      { id: 'welcome', name: 'welcome.txt', type: 'text' },
      { id: 'rules', name: 'rules.md', type: 'text' },
      { id: 'announcements', name: 'announcements.log', type: 'text' },
    ],
    learning: [
      { id: 'basics', name: '01_basics.py', type: 'text' },
      { id: 'advanced', name: '02_advanced.py', type: 'text' },
      { id: 'strategies', name: '03_strategies.py', type: 'text' },
      { id: 'live', name: 'live_session.stream', type: 'voice' },
    ],
    community: [
      { id: 'general', name: 'general.chat', type: 'text' },
      { id: 'trades', name: 'trades.log', type: 'text' },
      { id: 'signals', name: 'signals.alert', type: 'text', locked: true },
    ],
  };

  useEffect(() => {
    const text = "E-MONEY SOCIETY";
    let idx = 0;
    const t = setInterval(() => {
      if (idx <= text.length) {
        setTypingText(text.slice(0, idx));
        idx++;
      } else clearInterval(t);
    }, 50);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const c = setInterval(() => setShowCursor(v => !v), 500);
    return () => clearInterval(c);
  }, []);

  return (
    <div className="flex h-screen bg-black text-green-500 font-mono text-xs overflow-hidden relative">
      <ServerList courses={courses} />
      <ChannelSidebar
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      <MainContent
        activeChannel={activeChannel}
        typingText={typingText}
        showCursor={showCursor}
      />
      <MemberList />
    </div>
  );
};

export default EMoneyPlatform;