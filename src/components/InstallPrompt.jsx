import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detectez platformele
    const userAgent = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    // Handle pentru Android install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android - folosesc native prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // iOS sau alte platforme - arăt instrucțiunile
      setShowInstructions(true);
    }
  };

  const getInstructions = () => {
    if (isIOS) {
      return {
        steps: [
          'Apasă pe butonul "Share" (pătratul cu săgeata în sus) din bara de jos',
          'Scroll în jos și apasă pe "Add to Home Screen"',
          'Apasă "Add" în colțul din dreapta sus',
          'Aplicația va fi instalată pe Home Screen'
        ],
        icon: '📱'
      };
    } else if (isAndroid) {
      return {
        steps: [
          'Apasă pe meniul cu 3 puncte (⋮) din dreapta sus',
          'Selectează "Add to Home screen" sau "Install app"',
          'Apasă "Install" sau "Add"',
          'Aplicația va fi instalată pe Home Screen'
        ],
        icon: '🤖'
      };
    } else {
      return {
        steps: [
          'Caută opțiunea "Install" sau "Add to Home Screen" în meniul browser-ului',
          'Urmează instrucțiunile pentru instalarea aplicației',
          'Aplicația va fi disponibilă ca o aplicație nativă'
        ],
        icon: '💻'
      };
    }
  };

  const instructions = getInstructions();

  return (
    <div className="min-h-screen bg-discord-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-discord-matrix to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#003300_0%,_transparent_50%)]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {!showInstructions ? (
          // Main install screen
          <div className="text-center">
            {/* Logo/Icon */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-discord-green-dim to-discord-green-bright rounded-2xl flex items-center justify-center shadow-glow-green-lg">
              <span className="text-3xl font-bold text-discord-dark">E$</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-discord-green mb-2 tracking-wide">
              E-MONEY SOCIETY
            </h1>
            <p className="text-discord-green text-sm mb-8 opacity-80">
              TERMINAL v2.0 - PWA EDITION
            </p>

            {/* Installation message */}
            <div className="bg-discord-secondary/30 backdrop-blur-sm border border-discord-border rounded-xl p-6 mb-8">
              <div className="text-4xl mb-4">{instructions.icon}</div>
              <h2 className="text-discord-text text-lg font-semibold mb-3">
                Instalează aplicația
              </h2>
              <p className="text-discord-text-muted text-sm leading-relaxed mb-4">
                Pentru cea mai bună experiență, instalează E-Money Society ca aplicație nativă pe dispozitivul tău.
              </p>
              <div className="flex items-center justify-center space-x-2 text-discord-green text-xs">
                <div className="w-2 h-2 bg-discord-green rounded-full animate-pulse"></div>
                <span>Experiență nativă</span>
                <div className="w-1 h-1 bg-discord-green/50 rounded-full"></div>
                <span>Notificări</span>
                <div className="w-1 h-1 bg-discord-green/50 rounded-full"></div>
                <span>Offline ready</span>
              </div>
            </div>

            {/* Install button */}
            <button
              onClick={handleInstallClick}
              className="w-full bg-gradient-to-r from-discord-green-dim to-discord-green-bright text-discord-dark font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-glow-green-lg hover:scale-105 mb-4"
            >
              {deferredPrompt ? 'Instalează Aplicația' : 'Vezi Instrucțiunile'}
            </button>

            {/* Alternative access - doar pentru testing */}
            <button
              onClick={() => window.location.href = '/?force=browser'}
              className="text-discord-text-muted text-xs underline opacity-50 hover:opacity-100 transition-opacity"
            >
              Continuă în browser (nu recomandat)
            </button>
          </div>
        ) : (
          // Instructions screen
          <div className="text-center">
            <div className="text-4xl mb-4">{instructions.icon}</div>
            <h2 className="text-discord-green text-xl font-bold mb-6">
              Cum să instalezi aplicația
            </h2>

            <div className="bg-discord-secondary/30 backdrop-blur-sm border border-discord-border rounded-xl p-6 mb-6 text-left">
              <ol className="space-y-4">
                {instructions.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-discord-green text-discord-dark rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-discord-text text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setShowInstructions(false)}
              className="w-full bg-discord-secondary hover:bg-discord-hover text-discord-green border border-discord-border py-3 px-6 rounded-xl transition-all duration-200 mb-4"
            >
              ← Înapoi
            </button>

            {/* Refresh hint */}
            <p className="text-discord-text-muted text-xs">
              După instalare, aplicația se va deschide automat
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;