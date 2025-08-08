module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ultra-dark hacker theme with matrix green
        'discord-dark': '#000000', // Pure black background
        'discord-sidebar': '#0a0a0a', // Almost black sidebar
        'discord-channels': '#111111', // Very dark channel sidebar
        'discord-main': '#0c0c0c', // Main content - slightly lighter black
        'discord-secondary': '#1a1a1a', // Secondary elements
        'discord-hover': '#00ff41', // Matrix bright green hover
        'discord-green': '#00ff41', // Matrix bright green
        'discord-green-dim': '#00cc33', // Dimmer matrix green
        'discord-green-bright': '#39ff14', // Ultra bright neon green
        'discord-green-glow': '#00ff41', // Green for glow effects
        'discord-text': '#00ff41', // Matrix green text
        'discord-text-muted': '#009900', // Muted green text
        'discord-text-dark': '#006600', // Dark green text
        'discord-text-white': '#ffffff', // Pure white for contrast
        'discord-border': '#333333', // Dark border
        'discord-success': '#00ff41', // Success green
        'discord-accent': '#00ffff', // Cyan accent
        'discord-terminal': '#00ff00', // Terminal green
        'discord-matrix': '#003300', // Matrix background tint
      },
      fontFamily: {
        'mono': ['"Courier New"', 'Courier', 'monospace'],
        'matrix': ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 5px rgba(0, 255, 65, 0.3), 0 0 10px rgba(0, 255, 65, 0.2), 0 0 15px rgba(0, 255, 65, 0.1)',
        'glow-green-sm': '0 0 3px rgba(0, 255, 65, 0.4), 0 0 6px rgba(0, 255, 65, 0.2)',
        'glow-cyan': '0 0 5px rgba(0, 255, 255, 0.3), 0 0 10px rgba(0, 255, 255, 0.2)',
        'matrix': 'inset 0 0 10px rgba(0, 51, 0, 0.3)',
      },
      animation: {
        'pulse-green': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s linear infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'typing': 'typing 1s steps(var(--typing-steps, 15), end)',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: 'var(--typing-width, 15ch)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#00ff41 #1a1a1a',
          'overflow-y': 'scroll !important',
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '12px !important',
          display: 'block !important',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: '#1a1a1a !important',
          'border-radius': '6px',
          display: 'block !important',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#00ff41 !important',
          'border-radius': '6px',
          'min-height': '20px !important',
          display: 'block !important',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#39ff14 !important',
        },
        '.scrollbar-thin::-webkit-scrollbar-corner': {
          background: '#1a1a1a !important',
        },
        '.scrollbar-hidden': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none',
        },
      })
    }
  ],
}