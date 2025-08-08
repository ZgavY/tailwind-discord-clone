import React, { useState, useEffect, useRef, useCallback } from 'react';

const MainContent = ({ selectedChannel, messages, onSendMessage, formatTimestamp }) => {
  const [message, setMessage] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [othersTyping, setOthersTyping] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [textareaHeight, setTextareaHeight] = useState(28);
  const [justChangedChannel, setJustChangedChannel] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

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
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      const tolerance = 10;
      
      // Scroll button update-ul să fie instant, doar isAtBottom să fie throttled pe mobile
      setShowScrollButton(distanceFromBottom > 200);
      
      // Pe mobile, throttle doar isAtBottom pentru a nu interfere cu momentum
      if (window.innerWidth < 768) {
        clearTimeout(messagesContainerRef.current.scrollTimeout);
        messagesContainerRef.current.scrollTimeout = setTimeout(() => {
          setIsAtBottom(distanceFromBottom <= tolerance);
        }, 50);
      } else {
        setIsAtBottom(distanceFromBottom <= tolerance);
      }
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
      if (isMyMessage) {
        // Pe mobile, doar dacă nu user-ul nu a scroll-at manual recent
        if (window.innerWidth < 768) {
          if (isAtBottom) { // Pe mobile, doar dacă e la bottom
            setTimeout(() => {
              scrollToBottom(false);
            }, 10);
          }
        } else {
          // Pe desktop, întotdeauna pentru mesajele mele
          if (!isUserInteracting) {
            setTimeout(() => {
              scrollToBottom(false);
            }, 10);
          }
        }
      }
      // Pentru mesajele altora - doar dacă sunt la bottom
      else if (!isMyMessage && isAtBottom && !isUserInteracting) {
        setTimeout(() => {
          scrollToBottom(false);
        }, 10);
      }
    }
  }, [messages, isAtBottom, scrollToBottom, justChangedChannel, isUserInteracting]);

  // Reset scroll la schimbarea canalului
  useEffect(() => {
    setIsAtBottom(true);
    setShowScrollButton(false);
    setMessage('');
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

  // Handle message send cu Discord-style failed messages
  const handleSendMessage = useCallback(async () => {
    if (!message.trim() || isSending) return;
    
    setIsSending(true);
    setError(null);
    const messageToSend = message;
    const tempId = Date.now();
    setMessage('');
    
    // Reset textarea height și focus
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.style.height = '28px';
        }
      });
    }
    setTextareaHeight(28);
    
    // Adaugă mesajul cu status "sending"
    const pendingMessage = {
      id: tempId,
      author: 'root@emoney',
      role: 'user',
      timestamp: new Date(),
      content: messageToSend,
      status: 'sending'
    };
    
    onSendMessage(pendingMessage);
    
    // Simulez delay pentru trimiterea mesajului
    setTimeout(() => {
      // Simulez posibilă eroare (10% chance pentru demo)
      if (Math.random() < 0.1) {
        // Update mesajul cu status "failed"
        const failedMessage = {
          ...pendingMessage,
          status: 'failed'
        };
        onSendMessage(failedMessage, true); // true = update existing
        setIsSending(false);
        
        // Focus textarea și după failed pentru continuare
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 50);
      } else {
        // Success - update mesajul cu status "sent"
        const sentMessage = {
          ...pendingMessage,
          status: 'sent'
        };
        onSendMessage(sentMessage, true); // true = update existing
        setIsSending(false);
        
        // Focus textarea după trimitere
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 50);
      }
    }, 300);
  }, [message, isSending, onSendMessage]);

  // Retry failed message
  const handleRetryMessage = useCallback((failedMessage) => {
    // Create a new message with new timestamp and ID
    const newRetryMessage = {
      ...failedMessage,
      id: Date.now(), // New ID pentru poziție nouă
      status: 'sending',
      timestamp: new Date()
    };
    
    // Remove old failed message și add new one
    onSendMessage(failedMessage, 'remove'); // Remove old
    onSendMessage(newRetryMessage); // Add new at bottom
    // Autoscroll se va triggera automat prin useEffect pentru mesajele mele
    
    // Retry logic
    setTimeout(() => {
      if (Math.random() < 0.3) { // 30% chance to fail again
        const failedAgain = {
          ...newRetryMessage,
          status: 'failed'
        };
        onSendMessage(failedAgain, true);
      } else {
        const sentMessage = {
          ...newRetryMessage,
          status: 'sent'
        };
        onSendMessage(sentMessage, true);
      }
    }, 300);
  }, [onSendMessage, isAtBottom, scrollToBottom]);

  // Simulare typing de la alții - cu mai mulți useri simultan
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.6) { // 60% chance
        const users = ['TradingMaster', 'CryptoGuru', 'InvestorPro', 'MatrixHacker', 'CoinWhale', 'ElonMuskFan'];
        
        // Poate adaugă un user nou la typing
        if (Math.random() < 0.7 && othersTyping.length < 3) {
          const availableUsers = users.filter(user => !othersTyping.includes(user));
          if (availableUsers.length > 0) {
            const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
            setOthersTyping(prev => [...prev, randomUser]);
            
            // Stop typing după 5-10 secunde
            setTimeout(() => {
              setOthersTyping(prev => prev.filter(user => user !== randomUser));
            }, Math.random() * 5000 + 5000);
          }
        }
        
        // Poate oprește un user din typing
        if (Math.random() < 0.3 && othersTyping.length > 0) {
          const userToRemove = othersTyping[Math.floor(Math.random() * othersTyping.length)];
          setOthersTyping(prev => prev.filter(user => user !== userToRemove));
        }
      }
    }, 2000); // Check la fiecare 2 secunde
    
    return () => clearInterval(interval);
  }, [othersTyping]);


  const roleColors = {
    admin: 'text-red-400',
    mod: 'text-discord-green-bright',
    user: 'text-discord-green',
  };

  return (
    <div className="flex-1 flex flex-col z-20 bg-discord-main relative h-full w-full overflow-hidden pwa-safe-left pwa-safe-right">
      {/* Desktop Header */}
      <div className="hidden md:flex h-12 border-b border-discord-border items-center px-4 bg-discord-main shadow-sm">
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
          className="absolute inset-0 p-4 md:p-4 pt-4 pb-1 bg-discord-main scrollbar-hidden overflow-y-scroll"
          style={{ 
            paddingBottom: '0.5rem',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Welcome Art */}
            {selectedChannel === 'welcome' && (
              <div className="mb-4">
                {/* Desktop ASCII Art */}
                <div className="hidden md:block text-discord-green text-xs whitespace-pre font-mono">
{`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ╭─── E-MONEY SOCIETY - TERMINAL v2.0 ───╮ ┃
┃ │    ▶ ACCESS GRANTED - ROOT PRIVILEGES    │ ┃
┃ │       "HACK THE MATRIX, EARN THE $$$"       │ ┃
┃ ╰────────────────────────────────────────────╯ ┃
┃ [SYSTEM] Matrix connection established...       ┃
┃ [STATUS] All systems operational ● ONLINE    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`}
                </div>
                
                {/* Mobile Welcome */}
                <div className="md:hidden text-center p-4 bg-gradient-to-br from-discord-secondary/30 to-discord-secondary/10 rounded-xl border border-discord-border/50 backdrop-blur-sm">
                  <div className="text-discord-green-bright text-lg font-bold mb-1 tracking-wide">E-MONEY SOCIETY</div>
                  <div className="text-discord-green text-xs font-medium">TERMINAL v2.0</div>
                  <div className="text-discord-text-muted text-xs mt-2 opacity-80">🔓 ACCESS GRANTED</div>
                  <div className="flex justify-center mt-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-discord-green to-transparent rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex space-x-3 px-3 md:px-2 py-2 md:py-1 -mx-3 md:-mx-2 rounded-xl md:rounded-md transition-all duration-200 group ${
                    msg.status === 'failed' 
                      ? 'bg-red-900/10 border-l-2 border-red-500/50 md:hover:bg-red-900/20 md:hover:border-red-500/70' 
                      : msg.status === 'sending' 
                      ? 'opacity-70 animate-pulse md:hover:bg-discord-secondary/20' 
                      : 'md:hover:bg-discord-secondary/30'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-sm font-bold flex-shrink-0 transition-all duration-200 shadow-lg relative ${
                    msg.status === 'failed' 
                      ? 'bg-gradient-to-br from-red-500/80 to-red-600/80 text-red-100' 
                      : msg.status === 'sending'
                      ? 'bg-gradient-to-br from-discord-green-dim/60 to-discord-green-bright/60 text-discord-dark/80'
                      : 'bg-gradient-to-br from-discord-green-dim to-discord-green-bright text-discord-dark md:group-hover:shadow-glow-green-sm'
                  }`}>
                    {msg.author.charAt(0)}
                  </div>
                  
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header - User and timestamp */}
                    <div className="flex items-baseline space-x-2 mb-1.5 md:mb-1">
                      <span className={`${roleColors[msg.role]} font-bold text-sm md:text-sm md:hover:underline cursor-pointer transition-all`}>
                        {msg.author}
                      </span>
                      {msg.status !== 'failed' && (
                        <span className="text-discord-text-dark text-xs opacity-60 md:group-hover:opacity-100 transition-opacity">
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
                      
                      {/* Message actions - doar pe desktop */}
                      <div className="hidden md:flex opacity-0 md:group-hover:opacity-100 transition-opacity space-x-1 ml-auto">
                        <button className="text-discord-text-dark md:hover:text-discord-green text-xs p-1 md:hover:bg-discord-hover rounded transition-all">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Message text */}
                    <div className="text-discord-text-white text-sm md:text-sm break-words leading-relaxed">
                      {msg.content.split('\n').map((line, index) => (
                        <div key={index} className="min-h-[1.25rem]">{line}</div>
                      ))}
                    </div>
                    
                    {/* Failed message retry button */}
                    {msg.status === 'failed' && (
                      <div className="mt-3 flex items-center space-x-3">
                        <button 
                          onClick={() => handleRetryMessage(msg)}
                          className="flex items-center space-x-2 text-discord-green md:hover:text-discord-green-bright text-xs bg-gradient-to-r from-discord-secondary/40 to-discord-secondary/20 md:hover:from-discord-secondary/60 md:hover:to-discord-secondary/40 px-3 py-2 rounded-lg border border-discord-border/30 md:hover:border-discord-green/30 transition-all duration-200 font-medium shadow-sm md:hover:shadow-md"
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
      <div className="px-3 md:px-4 py-2 bg-discord-main flex-shrink-0">
        {/* Desktop Input */}
        <div className="hidden md:flex items-center bg-discord-secondary rounded-lg">
          <span className="text-discord-green-bright px-2">$</span>
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                
                // Auto-resize textarea - forțat recalculare completă
                e.target.style.height = 'auto';
                const newHeight = Math.min(e.target.scrollHeight, 200);
                e.target.style.height = newHeight + 'px';
                setTextareaHeight(newHeight);
                
                // Dacă user-ul e la bottom, menținem scroll-ul la bottom după resize
                if (isAtBottom) {
                  setIsUserInteracting(true); // Block smooth scrolls
                  requestAnimationFrame(() => {
                    if (messagesContainerRef.current) {
                      const container = messagesContainerRef.current;
                      const currentScrollBehavior = container.style.scrollBehavior;
                      container.style.scrollBehavior = 'auto'; // Force instant
                      container.scrollTop = container.scrollHeight;
                      container.style.scrollBehavior = currentScrollBehavior; // Restore
                    }
                    // Clear block after 100ms
                    setTimeout(() => setIsUserInteracting(false), 100);
                  });
                }
                
                // Show/hide scrollbar DOAR când chiar se schimbă starea
                const isAtMaxHeight = newHeight >= 200;
                const currentOverflow = e.target.style.overflowY;
                
                if (isAtMaxHeight && currentOverflow !== 'auto') {
                  e.target.style.overflowY = 'auto';
                  e.target.classList.remove('scrollbar-hidden');
                  e.target.classList.add('scrollbar-thin');
                } else if (!isAtMaxHeight && currentOverflow !== 'hidden') {
                  e.target.style.overflowY = 'hidden';
                  e.target.classList.remove('scrollbar-thin');
                  e.target.classList.add('scrollbar-hidden');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Mesaj în #${selectedChannel}...`}
              disabled={isSending}
              rows={1}
              className="w-full bg-transparent text-discord-green placeholder-discord-text-muted outline-none text-sm transition-all disabled:opacity-50 resize-none px-3 py-2 scrollbar-hidden"
              style={{ 
                minHeight: '28px',
                maxHeight: '180px',
                lineHeight: '16px',
                paddingTop: '6px',
                paddingBottom: '6px'
              }}
            />
            {/* Character counter pentru mesaje lungi */}
            {message.length > 1500 && (
              <div className={`absolute -top-6 right-0 text-xs ${message.length > 2000 ? 'text-red-400' : 'text-discord-text-muted'}`}>
                {message.length}/2000
              </div>
            )}
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending || message.length > 2000}
            className="text-discord-green/50 hover:text-discord-green ml-2 p-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Input */}
        <div className="md:hidden bg-discord-secondary rounded-2xl p-3 mx-2 flex items-end gap-2 shadow-lg">
          <div className="flex-1 flex items-center min-h-[32px]">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                
                // Auto-resize textarea
                e.target.style.height = 'auto';
                const newHeight = Math.min(e.target.scrollHeight, 120);
                e.target.style.height = newHeight + 'px';
                setTextareaHeight(newHeight);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Mesaj în #${selectedChannel}...`}
              disabled={isSending}
              rows={1}
              className="w-full bg-transparent text-discord-green placeholder-discord-text-muted/70 outline-none text-sm resize-none leading-5"
              style={{ 
                minHeight: '20px',
                maxHeight: '120px'
              }}
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending}
            className="w-8 h-8 rounded-full bg-discord-green flex items-center justify-center text-discord-dark disabled:opacity-50 mb-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>


      {/* Typing indicator */}
      <div className="h-4 md:h-6 px-5 items-start pt-1 bg-discord-main transition-all duration-200 flex pb-2 pwa-safe-bottom">
        {othersTyping.length > 0 ? (
          <>
            {/* Desktop typing indicator - simple */}
            <div className="hidden md:flex items-center space-x-2 text-xs text-discord-text-muted">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="truncate">
                {othersTyping.length === 1 
                  ? `${othersTyping[0]} scrie...`
                  : `${othersTyping.length} persoane scriu...`
                }
              </span>
            </div>
            
            {/* Mobile typing indicator - original style */}
            <div className="md:hidden bg-discord-secondary/60 rounded-full px-3 py-1 flex items-center space-x-2 text-xs text-discord-text-muted backdrop-blur-sm">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="truncate">
                {othersTyping.length === 1 
                  ? `${othersTyping[0]} scrie...`
                  : `${othersTyping.length} persoane scriu...`
                }
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MainContent;