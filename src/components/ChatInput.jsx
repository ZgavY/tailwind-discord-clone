import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ selectedChannel, onSendMessage, isSending }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const previousInputHeight = useRef(0);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;
    
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
        
        // Focus textarea după trimitere
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 50);
      }
    }, 300);
  };

  // Listen for retry focus events
  useEffect(() => {
    // Initialize height reference
    if (inputRef.current) {
      previousInputHeight.current = inputRef.current.offsetHeight;
    }
    
    const handleRetryFocus = () => {
      if (inputRef.current) {
        // Try focus with slight delay to ensure DOM is ready
        setTimeout(() => {
          inputRef.current.focus();
        }, 10);
      }
    };
    
    window.addEventListener('retryFocusNeeded', handleRetryFocus);
    return () => window.removeEventListener('retryFocusNeeded', handleRetryFocus);
  }, []);

  return (
    <div ref={containerRef} className="chat-input-container px-4 py-2 bg-discord-main flex-shrink-0">
      <div className="flex items-center bg-discord-secondary rounded-lg">
        <span className="text-discord-green-bright px-2">$</span>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              
              // Auto-resize textarea with delayed scroll prevention
              const messagesContainer = document.querySelector('[data-messages-container]');
              const currentScrollTop = messagesContainer ? messagesContainer.scrollTop : 0;
              
              e.target.style.height = 'auto';
              const newHeight = Math.min(e.target.scrollHeight, 200);
              e.target.style.height = newHeight + 'px';
              
              // Use setTimeout to restore scroll after browser auto-scroll
              setTimeout(() => {
                if (messagesContainer) {
                  messagesContainer.scrollTop = currentScrollTop;
                }
              }, 0);
              
              // Show/hide scrollbar
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
    </div>
  );
};

export default ChatInput;