import React from 'react';

const MobileNotSupported = () => {
  return (
    <div className="bg-discord-dark text-discord-text font-mono w-full h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-discord-matrix to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#003300_0%,_transparent_50%)]"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="text-discord-green-bright text-2xl font-bold mb-2 tracking-wide">
            E-MONEY SOCIETY
          </div>
          <div className="text-discord-green text-sm font-medium">
            TERMINAL v2.0
          </div>
        </div>

        {/* Main message */}
        <div className="bg-gradient-to-br from-discord-secondary/30 to-discord-secondary/10 rounded-xl border border-discord-border/50 backdrop-blur-sm p-6 mb-6">
          <div className="text-discord-green-bright text-lg font-bold mb-4">
            💻 Desktop Only
          </div>
          <div className="text-discord-text-white text-sm leading-relaxed mb-4">
            E-Money Society este momentan optimizată doar pentru desktop. 
            Pentru cea mai bună experiență, accesează platforma de pe un computer.
          </div>
          <div className="text-discord-green text-sm font-medium mt-2">
            📱 Aplicație mobilă nativă în dezvoltare
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-discord-green text-xs">
            <div className="w-2 h-2 bg-discord-green-bright rounded-full animate-pulse"></div>
            <span>Sistem în dezvoltare activă</span>
          </div>
        </div>

        {/* Decorative line */}
        <div className="flex justify-center mt-6">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-discord-green to-transparent rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileNotSupported;