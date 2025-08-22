import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

const ChatInput = ({ selectedChannel, onSendMessage, isSending }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { currentUser } = useAuth();

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;
    
    const messageToSend = message;
    const tempId = Date.now();
    setMessage('');
    
    // Adaugă mesajul cu status "sending"
    const pendingMessage = {
      id: tempId,
      author: currentUser.username,
      authorDisplay: currentUser.displayName,
      role: currentUser.role,
      avatar: currentUser.avatar,
      color: currentUser.color,
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
    <>
      <style>{`
        .discord-textarea-input {
          background-color: transparent !important;
          color: #00ff41 !important;
          font-size: 13px !important;
          line-height: 16px !important;
          font-family: "Courier New", Courier, monospace !important;
          font-weight: 400 !important;
          padding: 6px 12px !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .discord-textarea-input::placeholder {
          color: #009900 !important;
          opacity: 1 !important;
          font-family: "Courier New", Courier, monospace !important;
        }
        .discord-textarea-input:disabled {
          opacity: 0.5 !important;
          background-color: transparent !important;
          color: #00ff41 !important;
        }
        .discord-textarea-input:focus {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div ref={containerRef} className="chat-input-container px-4 py-2 bg-discord-main flex-shrink-0">
      <div className="flex items-center bg-discord-secondary rounded-lg">
        <span className="text-discord-green-bright px-2">$</span>
        <div className="flex-1 relative">
          <Textarea
            ref={inputRef}
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Mesaj în #${selectedChannel}...`}
            disabled={isSending}
            autosize
            minRows={1}
            maxRows={8}
            variant="unstyled"
            size="xs"
            classNames={{
              input: 'discord-textarea-input'
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
    </>
  );
};

export default ChatInput;