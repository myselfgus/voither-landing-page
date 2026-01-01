/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['DM Sans', 'Inter', 'sans-serif'],
			display: ['Instrument Serif', 'serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
        health: {
          teal: '#00A896',
          danger: '#C44536',
          dark: '#1A1A18',
          bg: '#F8F8F6'
        },
  			input: 'hsl(var(--input))',
  		},
  		boxShadow: {
  			neu: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
        'neu-inset': 'inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff',
        'neu-soft': '4px 4px 8px #e0e0e0, -4px -4px 8px #ffffff',
  			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  		},
  		keyframes: {
  			'wave-expand': {
  				'0%, 100%': { height: '10%' },
  				'50%': { height: '100%' }
  			},
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' }
        }
  		},
  		animation: {
  			'wave-expand': 'wave-expand 1s ease-in-out infinite',
        'shake': 'shake 0.3s ease-in-out infinite'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")]
}