import React, { useState, useEffect } from 'react';
import ServerList from './components/ServerList';
import ChannelSidebar from './components/ChannelSidebar';
import MainContent from './components/MainContent';
import MembersList from './components/MembersList';
import MobileNotSupported from './components/MobileNotSupported';

function App() {
  const [selectedChannel, setSelectedChannel] = useState('welcome');
  const [isSending, setIsSending] = useState(false);
  
  // Detect mobile device (not just window size)
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);




  // Funcția pentru formatarea timestamp-urilor ca în Discord
  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Acum';
    if (diffInMinutes < 60) return `Acum ${diffInMinutes} min`;
    if (diffInHours < 24) {
      if (diffInHours === 1) return `Acum o oră`;
      return `Acum ${diffInHours} ore`;
    }
    if (diffInDays === 1) return `Ieri la ${date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}`;
    if (diffInDays < 7) return `Acum ${diffInDays} zile`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return weeks === 1 ? 'Acum o săptămână' : `Acum ${weeks} săptămâni`;
    }
    
    // Pentru mai mult de o lună, arată data
    return date.toLocaleDateString('ro-RO', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const [messages, setMessages] = useState({
    welcome: [
      {
        id: 1,
        author: 'E-MONEY_SYSTEM',
        role: 'admin',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 zile în urmă
        content: 'Bun venit în E-Money Society! 🚀 Aici înveți să faci bani în era digitală.',
      },
      {
        id: 2,
        author: 'root@emoney',
        role: 'admin',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 45 * 60 * 1000), // Ieri cu 45 min în urmă
        content: 'Sistemul a fost inițializat. Toate modulele sunt ONLINE. Să începem!',
      },
      {
        id: 3,
        author: 'TradingBot',
        role: 'mod',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 ore în urmă
        content: 'Daily market analysis: BTC +2.3%, ETH +1.8%. Bullish momentum continues.',
      },
      {
        id: 4,
        author: 'CryptoNewbie',
        role: 'user',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min în urmă
        content: 'Salut! Sunt nou aici. Mulțumesc pentru primire! 🙏',
      }
    ],
    rules: [
      {
        id: 1,
        author: 'E-MONEY_SYSTEM',
        role: 'admin',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 zile în urmă
        content: '📋 REGULILE E-MONEY SOCIETY:\n1. Respect pentru toți membrii\n2. Nu spam în chat\n3. Conținut educațional de calitate\n4. Ajută-ți colegii să crească',
      },
      {
        id: 2,
        author: 'ModeratorPro',
        role: 'mod',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 zile în urmă
        content: 'Reminder: Toate întrebările despre trading se pun în #basics sau #advanced. Mulțumim!',
      }
    ],
    basics: [
      {
        id: 1,
        author: 'TradingMaster',
        role: 'mod',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 zile în urmă
        content: 'Lecția 1: Fundamentele investițiilor. Să înțelegem ce înseamnă cu adevărat să investești.',
      },
      {
        id: 2,
        author: 'InvestorPro',
        role: 'mod',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000), // Ieri cu 6 ore în urmă
        content: 'Lecția 2: Risk Management - cel mai important aspect al trading-ului. Nu riscați niciodată mai mult de 2% pe trade.',
      },
      {
        id: 3,
        author: 'StudentTrader',
        role: 'user',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min în urmă
        content: 'Mulțumesc pentru lecție! Foarte utilă explicația despre diversificare.',
      }
    ],
    general: [
      {
        id: 1,
        author: 'CryptoGuru',
        role: 'mod',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 săptămână în urmă
        content: 'Ce părere aveți despre piața actuală? Bitcoin pare să se consolideze.',
      },
      {
        id: 2,
        author: 'MarketAnalyst',
        role: 'mod',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 zile în urmă
        content: 'Tesla a anunțat că acceptă din nou Bitcoin. Impact pozitiv pe termen scurt.',
      },
      {
        id: 3,
        author: 'DayTrader99',
        role: 'user',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 4.5 * 60 * 60 * 1000), // Ieri seara
        content: 'Am făcut +15% săptămâna asta folosind strategiile învățate aici. Thanks team! 💪',
      },
      {
        id: 4,
        author: 'BeginnerLuck',
        role: 'user',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 ore în urmă
        content: 'Întrebare: e bun momentul să intru în ETH acum sau să mai aștept?',
      },
      {
        id: 5,
        author: 'RiskManager',
        role: 'mod',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min în urmă
        content: '@BeginnerLuck Nu dăm sfaturi financiare directe. Studiază analiza tehnică din #basics mai întâi! 📚',
      }
    ]
  });

  const handleChannelChange = (channelId) => {
    setSelectedChannel(channelId);
  };

  const handleSendMessage = (messageData, operation = false) => {
    if (operation === 'remove') {
      // Remove message
      setMessages(prev => ({
        ...prev,
        [selectedChannel]: (prev[selectedChannel] || []).filter(msg => msg.id !== messageData.id)
      }));
    } else if (operation === true) {
      // Update existing message
      setMessages(prev => ({
        ...prev,
        [selectedChannel]: (prev[selectedChannel] || []).map(msg => 
          msg.id === messageData.id ? messageData : msg
        )
      }));
      // Update isSending based on message status
      if (messageData.status === 'sent' || messageData.status === 'failed') {
        setIsSending(false);
      }
    } else {
      // Add new message
      setMessages(prev => ({
        ...prev,
        [selectedChannel]: [...(prev[selectedChannel] || []), messageData]
      }));
      // Set sending state when adding new message
      if (messageData.status === 'sending') {
        setIsSending(true);
      }
    }
  };

  const handleRetryMessage = (failedMessage) => {
    // Create a new message with new timestamp and ID
    const newRetryMessage = {
      ...failedMessage,
      id: Date.now(), // New ID pentru poziție nouă
      status: 'sending',
      timestamp: new Date()
    };
    
    // Remove old failed message și add new one
    handleSendMessage(failedMessage, 'remove'); // Remove old
    handleSendMessage(newRetryMessage); // Add new at bottom
    
    // Retry logic
    setTimeout(() => {
      if (Math.random() < 0.3) { // 30% chance to fail again
        const failedAgain = {
          ...newRetryMessage,
          status: 'failed'
        };
        handleSendMessage(failedAgain, true);
        
        // Focus textarea after failed retry
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('retryFocusNeeded'));
        }, 100);
      } else {
        const sentMessage = {
          ...newRetryMessage,
          status: 'sent'
        };
        handleSendMessage(sentMessage, true);
        
        // Focus textarea after successful retry
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('retryFocusNeeded'));
        }, 100);
      }
    }, 300);
  };



  // Dacă e pe mobil, arată ecranul "nu e suportat"
  if (isMobileDevice) {
    return <MobileNotSupported />;
  }

  return (
    <div className="bg-discord-dark text-discord-text font-mono w-full flex relative overflow-hidden" style={{height: '100svh', maxHeight: '100svh'}}>
      {/* Matrix background effect - desktop only */}
      <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-discord-matrix to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#003300_0%,_transparent_50%)]"></div>
      </div>
      

      {/* Desktop Layout */}
      <div className="flex w-full">
        <ServerList />
        <ChannelSidebar 
          selectedChannel={selectedChannel}
          onChannelChange={handleChannelChange}
        />
        <MainContent 
          selectedChannel={selectedChannel}
          messages={messages[selectedChannel] || []}
          onSendMessage={handleSendMessage}
          formatTimestamp={formatTimestamp}
          onRetryMessage={handleRetryMessage}
          isSending={isSending}
        />
        <MembersList />
      </div>
    </div>
  );
}

export default App;
