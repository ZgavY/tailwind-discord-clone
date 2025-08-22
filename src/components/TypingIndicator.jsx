import React, { useState, useEffect } from 'react';

const TypingIndicator = () => {
  const [othersTyping, setOthersTyping] = useState([]);

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

  return (
    <div className="typing-indicator-container h-6 px-5 items-center bg-discord-main transition-all duration-200 flex flex-shrink-0">
      {othersTyping.length > 0 ? (
        <div className="flex items-center space-x-2 text-xs text-discord-text-muted">
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
      ) : null}
    </div>
  );
};

export default TypingIndicator;