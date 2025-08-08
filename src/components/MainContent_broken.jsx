import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const MainContent = ({ selectedChannel, messages, onSendMessage, formatTimestamp }) => {
  const [message, setMessage] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [othersTyping, setOthersTyping] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll la mesajele noi - simplu
  const scrollToBottom = useCallback((instant = false) => {
    messagesEndRef.current?.scrollIntoView({ behavior: instant ? 'instant' : 'smooth' });
  }, []);

  // Check dacă user-ul e la bottom - simplu și clean
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  }, []);

  // Auto-scroll când apar mesaje noi (doar dacă user-ul e la bottom)
  useEffect(() => {
    if (isAtBottom && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  // Reset scroll la schimbarea canalului
  useEffect(() => {
    setIsAtBottom(true);
    setMessage('');
    // Nu mai e nevoie de setIsTyping pentru user - doar pentru alții
    setTimeout(() => scrollToBottom(true), 50);
  }, [selectedChannel]);

  // Handle message send cu loading state și error handling - memoized
  const handleSendMessage = useCallback(async () => {
    if (!message.trim() || isSending) return;
    
    setIsSending(true);
    setError(null);
    const messageToSend = message;
    setMessage('');
    
    try {
      // Simulez delay pentru trimiterea mesajului (realistic)
      setTimeout(() => {
        // Simulez posibilă eroare (1% chance)
        if (Math.random() < 0.01) {
          throw new Error('Mesaj nu a putut fi trimis. Încearcă din nou.');
        }
        
        onSendMessage(messageToSend);
        setIsSending(false);
        inputRef.current?.focus();
      }, 300);
    } catch (err) {
      setError(err.message);
      setMessage(messageToSend); // Returnează mesajul în input
      setIsSending(false);
      setTimeout(() => setError(null), 5000); // Clear error după 5 secunde
    }
  }, [message, isSending, onSendMessage]);

  // Simulare typing de la alții - simplu fără scroll complications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.03 && othersTyping.length === 0) { // 3% chance
        const users = ['TradingMaster', 'CryptoGuru', 'InvestorPro'];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        setOthersTyping([randomUser]);
        
        // Stop typing după 4 secunde
        setTimeout(() => {
          setOthersTyping([]);
        }, 4000);
      }
    }, 20000); // Check la fiecare 20 secunde
    
    return () => clearInterval(interval);
  }, [othersTyping]);

  const roleColors = {
    admin: 'text-red-400',
    mod: 'text-discord-green-bright',
    user: 'text-discord-green',
  };

  return (
    <div className="flex-1 flex flex-col z-20 bg-discord-main relative">
      {/* Channel Header - ascuns pe mobile (e în MobileNav) */}
      <div className="hidden md:flex h-12 border-b border-discord-border items-center px-4 bg-discord-main shadow-sm">
        <span className="text-discord-green mr-2">#</span>
        <span className="text-discord-green font-semibold">{selectedChannel}</span>
        <div className="text-discord-green text-sm ml-4 inline-flex items-center">
          <span className="overflow-hidden whitespace-nowrap animate-typing">
            E-MONEY SOCIETY
          </span>
          <span className="text-discord-green-bright animate-blink ml-1">_</span>
        </div>
      </div>

      {/* Messages Area - cu padding pentru mobile nav */}
      <div className="flex-1 relative">
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto p-4 pt-16 md:pt-4 pb-2 bg-discord-main scroll-smooth scrollbar-thin"
          style={{ scrollBehavior: 'smooth' }}
        >
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Welcome ASCII Art - doar pentru welcome channel */}
          {selectedChannel === 'welcome' && (
            <div className="text-discord-green text-xs whitespace-pre font-mono mb-8">
              <div className="hidden md:block">
{`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ╭─── E-MONEY SOCIETY - TERMINAL v2.0 ───╮ ┃
┃ │    ▶ ACCESS GRANTED - ROOT PRIVILEGES    │ ┃
┃ │       "HACK THE MATRIX, EARN THE $$$"       │ ┃
┃ ╰────────────────────────────────────────────╯ ┃
┃ [SYSTEM] Matrix connection established...       ┃
┃ [STATUS] All systems operational ● ONLINE    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`}
              </div>
              <div className="md:hidden text-center">
                <div className="text-lg font-bold text-discord-green-bright">E-MONEY SOCIETY</div>
                <div className="text-xs text-discord-green">TERMINAL v2.0 - MATRIX MODE</div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className="flex space-x-3 px-2 py-1 -mx-2 hover:bg-discord-secondary/30 rounded-md transition-all duration-200 group"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-discord-green-dim flex items-center justify-center text-discord-text text-sm font-bold flex-shrink-0 group-hover:shadow-glow-green-sm transition-all duration-200">
                  {msg.author.charAt(0)}
                </div>
                
                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  {/* Header - User and timestamp */}
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className={`${roleColors[msg.role]} font-bold text-sm hover:underline cursor-pointer transition-all`}>
                      {msg.author}
                    </span>
                    <span className="text-discord-text-dark text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                    
                    {/* Message actions - apar pe hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-auto">
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
                </div>
              </div>
            ))}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
          
        </div>
        
        {/* Scroll to bottom button - poziționat relativ la messages area */}
        {!isAtBottom && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-6 w-10 h-10 bg-discord-secondary hover:bg-discord-hover rounded-full flex items-center justify-center text-discord-green hover:text-discord-green-bright transition-all shadow-lg hover:shadow-glow-green-sm z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute bottom-32 left-4 right-4 bg-red-900/90 border border-red-500 rounded-lg p-3 text-red-200 text-sm backdrop-blur-sm z-20">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Typing indicator - pentru alți useri */}
      {othersTyping.length > 0 && (
        <div className="px-4 py-1 bg-discord-main border-t border-discord-border/50">
          <div className="flex items-center space-x-2 text-xs text-discord-text-muted">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-1 bg-discord-green rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span>{othersTyping[0]} scrie un mesaj...</span>
          </div>
        </div>
      )}

      {/* Input Area - expandable textarea */}
      <div className="min-h-16 max-h-80 border-t border-discord-border flex items-end px-4 py-3 bg-discord-main">
        <span className="text-discord-green-bright mr-2 hidden md:inline self-end pb-1">$</span>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              // Auto-resize textarea cu auto-scroll
              e.target.style.height = 'auto';
              const newHeight = Math.min(e.target.scrollHeight, 280);
              e.target.style.height = newHeight + 'px';
              
              // Auto-scroll chat la bottom când textarea se expandează - INSTANT
              if (isAtBottom && newHeight > 60) {
                setTimeout(() => scrollToBottom(true), 10);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Mesaj în #${selectedChannel}... (Shift+Enter pentru rând nou)`}
            disabled={isSending}
            rows={1}
            className="w-full bg-discord-secondary/30 text-discord-green placeholder-discord-text-muted outline-none text-sm transition-all disabled:opacity-50 resize-none rounded-lg px-3 py-2 border border-discord-border focus:border-discord-green/50 scrollbar-thin"
            style={{ 
              minHeight: '36px',
              maxHeight: '280px',
              lineHeight: '20px'
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
          className="text-discord-green/50 hover:text-discord-green ml-2 p-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed self-end"
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
    </div>
  );
};

export default MainContent;
