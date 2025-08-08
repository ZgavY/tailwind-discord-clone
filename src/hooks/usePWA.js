import { useState, useEffect } from 'react';

export const usePWA = () => {
  const [isPWA, setIsPWA] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkPWAStatus = () => {
      // Check dacă rulează ca PWA (standalone mode)
      const isInStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.navigator.standalone === true; // iOS specific

      // Check dacă e pe mobil
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check pentru URL params (pentru forțarea browser mode în testing)
      const urlParams = new URLSearchParams(window.location.search);
      const forceBrowser = urlParams.get('force') === 'browser';

      setIsStandalone(isInStandaloneMode);
      setIsMobile(isMobileDevice);
      setIsPWA(isInStandaloneMode && !forceBrowser);
    };

    checkPWAStatus();

    // Listen pentru schimbări în display mode
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = () => checkPWAStatus();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback pentru browsere mai vechi
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return {
    isPWA,
    isMobile,
    isStandalone,
    shouldShowInstallPrompt: isMobile && !isPWA
  };
};