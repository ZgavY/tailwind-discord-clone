import React, { useRef, useEffect, useState, useCallback } from 'react';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import StatusIndicator from './StatusIndicator';
import UserProfile from './UserProfile';
import CoursesView from './CoursesView';
import MemberManagement from './MemberManagement';
import AchievementsView from './AchievementsView';
import { useAuth } from '../contexts/AuthContext';

const MainContent = ({ selectedChannel, messages, onSendMessage, formatTimestamp, onRetryMessage, isSending = false }) => {
  const messagesContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { currentUser, mockUsers } = useAuth();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [, setShowCursor] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const typingTimeoutRef = useRef(null);
  const messagesAreaRef = useRef(null);
  const previousAreaHeight = useRef(0);
  const resizeObserverRef = useRef(null);

  // Function să găsim user data pentru un username
  const getUserByUsername = (username) => {
    return mockUsers.find(user => user.username === username) || {
      username,
      displayName: username,
      avatar: username.charAt(0).toUpperCase(),
      color: '#00ff41',
      status: 'offline',
      role: 'member'
    };
  };

  // Simple scroll to bottom function
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Check if user is at bottom
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      const tolerance = 50; // 50px tolerance
      
      setIsAtBottom(distanceFromBottom <= tolerance);
      setShowScrollButton(distanceFromBottom > 200); // Show button when 200px+ from bottom
    }
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const isMyMessage = lastMessage.author === currentUser?.username;
      
      if (isMyMessage && lastMessage.status === 'sending') {
        // Always scroll when sending a new message
        scrollToBottom();
      } else if (isMyMessage && (lastMessage.status === 'sent' || lastMessage.status === 'failed') && isAtBottom) {
        // Scroll for my message status updates only if already at bottom
        scrollToBottom();
      } else if (!isMyMessage && isAtBottom) {
        // Scroll for others' messages only if I'm already at bottom
        scrollToBottom();
      }
    }
  }, [messages, isAtBottom, currentUser?.username]);

  // Scroll to bottom when changing channels
  useEffect(() => {
    scrollToBottom();
    setIsAtBottom(true);
    setShowScrollButton(false);
  }, [selectedChannel]);

  // Epic terminal typing animation
  useEffect(() => {
    const targetText = selectedChannel.toUpperCase();
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Start fresh
    setIsTyping(true);
    setShowCursor(true);
    setDisplayedText('');
    
    // Simulate typing with random delays for authentic feel
    const typeChar = (index) => {
      if (index < targetText.length) {
        setDisplayedText(targetText.slice(0, index + 1));
        
        // Random delay between 40-120ms for natural typing rhythm
        const delay = Math.random() * 80 + 40;
        
        typingTimeoutRef.current = setTimeout(() => {
          typeChar(index + 1);
        }, delay);
      } else {
        // Typing finished
        setIsTyping(false);
        
        // Brief pause before cursor starts blinking
        setTimeout(() => {
          setShowCursor(true);
        }, 200);
      }
    };
    
    // Start typing after brief initial delay
    typingTimeoutRef.current = setTimeout(() => {
      typeChar(0);
    }, 100);
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [selectedChannel]);

  // Monitor messages area height and maintain scroll position for ANY resize
  useEffect(() => {
    const messagesArea = messagesAreaRef.current;
    if (!messagesArea) return;

    // Only create observer if it doesn't exist
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        const currentHeight = entry.contentRect.height;
        const previousHeight = previousAreaHeight.current;
        
        const heightDifference = currentHeight - previousHeight;
        
        // Adjust scroll for ANY height change to maintain visible content
        if (heightDifference !== 0 && messagesContainerRef.current && previousHeight > 0) {
          const container = messagesContainerRef.current;
          const oldScrollTop = container.scrollTop;
          
          // When area shrinks (textarea expands): scroll down to maintain content
          // When area expands (textarea shrinks): scroll up to maintain content  
          const newScrollTop = oldScrollTop - heightDifference;
          container.scrollTop = Math.max(0, newScrollTop); // Don't scroll below 0
        }
        
        previousAreaHeight.current = currentHeight;
      });
    }

    // Always re-observe (in case ref changed)
    resizeObserverRef.current.observe(messagesArea);
    
    // Update height reference
    if (previousAreaHeight.current === 0) {
      previousAreaHeight.current = messagesArea.offsetHeight;
    }

    return () => {
      if (resizeObserverRef.current && messagesArea) {
        resizeObserverRef.current.unobserve(messagesArea);
      }
    };
  }); // Run on every render to ensure observation

  const roleColors = {
    admin: 'text-red-400',
    mentor: 'text-discord-green-bright',
    member: 'text-discord-green',
    mod: 'text-discord-green-bright', // Legacy support
    user: 'text-discord-green', // Legacy support
  };

  return (
    <>
      <style>{`
        @keyframes cursor-blink {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }
        .cursor {
          color: #00ff41;
          text-shadow: 0 0 5px #00ff41;
        }
      `}</style>
      <div className="flex flex-col z-20 bg-discord-main relative w-full overflow-hidden" style={{ flex: '1 1 0px', minHeight: 0 }}>
      {/* Header */}
      <div className="flex h-12 border-b border-discord-border items-center px-4 bg-discord-main shadow-sm">
        <span className="text-discord-green mr-2">#</span>
        <div className="text-discord-green inline-flex items-center text-sm">
          <span className="overflow-hidden whitespace-nowrap font-mono tracking-wider">
            {displayedText}
            <span 
              className="cursor"
              style={{ 
                animation: isTyping ? 'none' : 'cursor-blink 1.2s infinite',
                opacity: isTyping ? 1 : undefined
              }}
            >
              _
            </span>
          </span>
        </div>
      </div>


      {/* Messages Area */}
      <div ref={messagesAreaRef} className="flex-1 relative overflow-hidden">
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          data-messages-container
          className="absolute inset-0 p-4 pt-4 pb-1 bg-discord-main overflow-y-scroll"
          style={{ 
            paddingBottom: '0.5rem'
          }}
        >
          {/* Special Views pentru anumite canale */}
          {selectedChannel === 'basics' ? (
            <CoursesView selectedChannel={selectedChannel} />
          ) : (selectedChannel === 'admin-control' || selectedChannel === 'mentor-lounge') ? (
            <MemberManagement selectedChannel={selectedChannel} />
          ) : selectedChannel === 'general' ? (
            <AchievementsView selectedChannel={selectedChannel} />
          ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Welcome Art */}
            {selectedChannel === 'welcome' && (
              <div className="mb-4">
                {/* ASCII Art */}
                <div className="text-discord-green text-xs whitespace-pre font-mono">
{`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ╭─── E-MONEY SOCIETY - TERMINAL v2.0 ───╮ ┃
┃ │    ▶ ACCESS GRANTED - ROOT PRIVILEGES    │ ┃
┃ │       "HACK THE MATRIX, EARN THE $$$"       │ ┃
┃ ╰────────────────────────────────────────────╯ ┃
┃ [SYSTEM] Matrix connection established...       ┃
┃ [STATUS] All systems operational ● ONLINE    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg) => {
                const userData = getUserByUsername(msg.author);
                return (
                <div 
                  key={msg.id} 
                  className={`flex space-x-3 px-2 py-1 -mx-2 rounded-md transition-all duration-200 group ${
                    msg.status === 'failed' 
                      ? 'bg-red-900/10 border-l-2 border-red-500/50 hover:bg-red-900/20 hover:border-red-500/70' 
                      : msg.status === 'sending' 
                      ? 'opacity-70 animate-pulse hover:bg-discord-secondary/20' 
                      : 'hover:bg-discord-secondary/30'
                  }`}
                >
                  {/* Avatar with Status */}
                  <div className="relative">
                    <button 
                      onClick={() => setSelectedProfile(userData.id || userData.username)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200 shadow-lg relative cursor-pointer hover:scale-105 ${
                        msg.status === 'failed' 
                          ? 'bg-gradient-to-br from-red-500/80 to-red-600/80 text-red-100' 
                          : msg.status === 'sending'
                          ? 'bg-gradient-to-br from-discord-green-dim/60 to-discord-green-bright/60 text-discord-dark/80'
                          : 'bg-gradient-to-br from-discord-green-dim to-discord-green-bright text-discord-dark group-hover:shadow-glow-green-sm'
                      }`} style={{ backgroundColor: msg.color || userData.color }}
                    >
                      {msg.avatar || userData.avatar}
                    </button>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <StatusIndicator status={userData.status} size="xs" />
                    </div>
                  </div>
                  
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header - User and timestamp */}
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className={`${roleColors[msg.role] || 'text-discord-green'} font-bold text-sm hover:underline cursor-pointer transition-all`} style={{ color: msg.color }}>
                        {msg.authorDisplay || msg.author}
                      </span>
                      {msg.status !== 'failed' && (
                        <span className="text-discord-text-dark text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      )}
                      
                      {/* Message status indicators */}
                      {msg.status === 'sending' && (
                        <div className="flex items-center space-x-1 bg-discord-secondary/50 px-2 py-1 rounded-full">
                          <div className="w-2 h-2 bg-discord-green rounded-full animate-pulse"></div>
                          <span className="text-discord-text-muted text-xs font-medium">Se trimite</span>
                        </div>
                      )}
                      
                      {msg.status === 'failed' && (
                        <div className="flex items-center space-x-1 bg-red-900/30 px-2 py-1 rounded-full border border-red-500/30">
                          <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-red-300 text-xs font-medium">Nu s-a livrat</span>
                        </div>
                      )}
                      
                      {/* Message actions */}
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity space-x-1 ml-auto">
                        <button className="text-discord-text-dark hover:text-discord-green text-xs p-1 hover:bg-discord-hover rounded transition-all">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Message text */}
                    <div className="text-discord-text-white text-sm break-words leading-relaxed">
                      {msg.content.split('\n').map((line, index) => (
                        <div key={index} className="min-h-[1.25rem]">{line}</div>
                      ))}
                    </div>
                    
                    {/* Failed message retry button */}
                    {msg.status === 'failed' && (
                      <div className="mt-3 flex items-center space-x-3">
                        <button 
                          onClick={() => onRetryMessage(msg)}
                          className="flex items-center space-x-2 text-discord-green hover:text-discord-green-bright text-xs bg-gradient-to-r from-discord-secondary/40 to-discord-secondary/20 hover:from-discord-secondary/60 hover:to-discord-secondary/40 px-3 py-2 rounded-lg border border-discord-border/30 hover:border-discord-green/30 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Încearcă din nou</span>
                        </button>
                        <span className="text-discord-text-muted text-xs opacity-60">
                          Mesajul nu a putut fi trimis
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
              })}
              
            </div>
            {/* Extra space at bottom pentru momentum scrolling */}
            <div style={{ height: '10px' }}></div>
          </div>
          )}
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-6 right-6 w-10 h-10 bg-discord-secondary hover:bg-discord-hover rounded-full flex items-center justify-center text-discord-green hover:text-discord-green-bright transition-all shadow-lg z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Input Area */}
      <div>
        <ChatInput 
          selectedChannel={selectedChannel}
          onSendMessage={onSendMessage}
          isSending={isSending}
        />
        
        <TypingIndicator />
      </div>
      </div>

      {/* User Profile Modal */}
      {selectedProfile && (
        <UserProfile 
          userId={selectedProfile} 
          isModal={true} 
          onClose={() => setSelectedProfile(null)} 
        />
      )}
    </>
  );
};

export default MainContent;