// tailwind.config.js - Configurația pentru tema terminal/hacker
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Terminal/Matrix style
        terminal: {
          black: '#0a0a0a',      // Background principal
          darkgray: '#1a1a1a',   // Background secundar
          gray: '#2d2d2d',       // Borders, separators
          green: '#00ff41',      // Verde neon principal
          darkgreen: '#00cc33',  // Verde mai închis pentru hover
          lightgreen: '#7dff9a', // Verde deschis pentru accente
          red: '#ff3333',        // Erori, warnings
          yellow: '#ffcc00',     // Highlights, badges
          cyan: '#00ffff',       // Links, info
          white: '#e0e0e0',      // Text principal
          dimwhite: '#a0a0a0',   // Text secundar
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        'terminal': ['Source Code Pro', 'monospace'],
      },
      fontSize: {
        'terminal': '13px',
      },
      backgroundImage: {
        'matrix-rain': "url('/src/assets/matrix-bg.gif')", // optional, dacă vrei efect Matrix
        'scan-lines': 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.03), rgba(0, 255, 65, 0.03) 1px, transparent 1px, transparent 2px)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'terminal-blink': 'terminalBlink 1s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'glitch': 'glitch 0.3s ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { 
            opacity: '1',
            filter: 'drop-shadow(0 0 3px #00ff41)',
          },
          '50%': { 
            opacity: '0.8',
            filter: 'drop-shadow(0 0 8px #00ff41)',
          },
        },
        terminalBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, -2px)' },
          '66%': { transform: 'translate(2px, 2px)' },
        }
      },
      boxShadow: {
        'terminal': '0 0 10px rgba(0, 255, 65, 0.5)',
        'terminal-hover': '0 0 20px rgba(0, 255, 65, 0.8)',
      },
    },
  },
  plugins: [],
}