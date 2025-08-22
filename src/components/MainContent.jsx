import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

const MainContent = ({ selectedChannel, messages, onSendMessage, formatTimestamp, onRetryMessage, isSending = false }) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [justChangedChannel, setJustChangedChannel] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const ignoreNextScrollEvent = useRef(false);

  // Auto-scroll la mesajele noi
  const scrollToBottom = useCallback((instant = false) => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      
      
      if (instant) {
        container.scrollTop = container.scrollHeight;
      } else {
        // Smooth scroll cu requestAnimationFrame
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    }
  }, []);

  // Forțează scrollbar vizibil prin CSS direct
  useEffect(() => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      const style = document.createElement('style');
      style.textContent = `
        .force-scrollbar::-webkit-scrollbar {
          width: 12px !important;
          display: block !important;
        }
        .force-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a !important;
        }
        .force-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff41 !important;
          min-height: 30px !important;
        }
        .force-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #39ff14 !important;
        }
      `;
      document.head.appendChild(style);
      element.classList.add('force-scrollbar');
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Check dacă user-ul e la bottom și dacă să arăt butonul - cu throttling pe mobile
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      // Ignore scroll events triggered by programmatic scroll
      if (ignoreNextScrollEvent.current) {
        ignoreNextScrollEvent.current = false;
        return;
      }
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      const tolerance = 10;
      
      
      // Scroll button update
      setShowScrollButton(distanceFromBottom > 200);
      
      // Desktop-only logic
      setIsAtBottom(distanceFromBottom <= tolerance);
    }
  }, []);

  // Auto-scroll când apar mesaje noi 
  useEffect(() => {
    
    if (messages.length > 0) {
      // Skip auto-scroll la schimbarea canalului - deja am facut jump instant
      if (justChangedChannel) {
        setJustChangedChannel(false);
        return;
      }
      
      const lastMessage = messages[messages.length - 1];
      const isMyMessage = lastMessage.author === 'root@emoney';
      
      // Pentru mesajele MELE - ÎNTOTDEAUNA autoscroll (ca Discord)
      // DAR nu pentru typing în input - doar pentru mesaje noi trimise
      if (isMyMessage && lastMessage.status !== undefined) { // Doar mesaje cu status (trimise efectiv)
        setTimeout(() => {
          scrollToBottom(false);
        }, 10);
      }
      // Pentru mesajele altora - doar dacă sunt la bottom
      else if (!isMyMessage && isAtBottom && !isUserInteracting) {
        setTimeout(() => {
          scrollToBottom(false); // smooth scroll pe desktop
        }, 10);
      }
    }
  }, [messages, isAtBottom, scrollToBottom, justChangedChannel, isUserInteracting]);

  // Reset scroll la schimbarea canalului
  useEffect(() => {
    setIsAtBottom(true);
    setShowScrollButton(false);
    setJustChangedChannel(true);
    
    // INSTANT jump to bottom
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.style.scrollBehavior = 'auto'; // Disable smooth scroll
      container.scrollTop = container.scrollHeight;
      // Re-enable smooth scroll after
      setTimeout(() => {
        container.style.scrollBehavior = 'smooth';
      }, 1);
    }
  }, [selectedChannel]);

  // DISABLED - Mobile keyboard management removed for desktop focus

  // REMOVED - Input expansion handling moved to direct approach

  const roleColors = {
    admin: 'text-red-400',
    mod: 'text-discord-green-bright',
    user: 'text-discord-green',
  };

  return (
    <div className="flex flex-col z-20 bg-discord-main relative w-full overflow-hidden" style={{ flex: '1 1 0px', minHeight: 0 }}>
      {/* Header */}
      <div className="flex h-12 border-b border-discord-border items-center px-4 bg-discord-main shadow-sm">
        <span className="text-discord-green mr-2">#</span>
        <div className="text-discord-green inline-flex items-center text-sm">
          <span className="overflow-hidden whitespace-nowrap">
            {selectedChannel.toUpperCase()}
          </span>
        </div>
      </div>


      {/* Messages Area */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          data-messages-container
          className="absolute inset-0 p-4 pt-4 pb-1 bg-discord-main scrollbar-hidden overflow-y-scroll"
          style={{ 
            paddingBottom: '0.5rem',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            scrollBehavior: 'auto' // Force disable smooth scroll
          }}
        >
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
              {messages.map((msg) => (
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
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200 shadow-lg relative ${
                    msg.status === 'failed' 
                      ? 'bg-gradient-to-br from-red-500/80 to-red-600/80 text-red-100' 
                      : msg.status === 'sending'
                      ? 'bg-gradient-to-br from-discord-green-dim/60 to-discord-green-bright/60 text-discord-dark/80'
                      : 'bg-gradient-to-br from-discord-green-dim to-discord-green-bright text-discord-dark group-hover:shadow-glow-green-sm'
                  }`}>
                    {msg.author.charAt(0)}
                  </div>
                  
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header - User and timestamp */}
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className={`${roleColors[msg.role]} font-bold text-sm hover:underline cursor-pointer transition-all`}>
                        {msg.author}
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
              ))}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
            {/* Extra space at bottom pentru momentum scrolling */}
            <div style={{ height: '10px' }}></div>
          </div>
        </div>

        
        {/* Scroll to bottom button - poziționat relativ la messages area */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-6 right-6 w-10 h-10 bg-discord-secondary hover:bg-discord-hover rounded-full flex items-center justify-center text-discord-green hover:text-discord-green-bright transition-all shadow-lg hover:shadow-glow-green-sm z-10"
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
  );
};

export default MainContent;