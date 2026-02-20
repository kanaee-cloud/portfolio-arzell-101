module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Lexend', 'SF Pro Display', 'system-ui', 'sans-serif'],
      secondary: ['Lexend', 'SF Pro Display', 'system-ui', 'sans-serif'],
      tertiary: ['Lexend', 'SF Pro Text', 'system-ui', 'sans-serif'],
      mono: ['SF Mono', 'Fira Code', 'monospace'],
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(10,132,255,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(10,132,255,0.25)' },
        },
      },
      colors: {
        primary: '#000000',
        accent: '#0A84FF',
        light: '#F2F2F7',
        ios: {
          bg: {
            primary: '#000000',
            secondary: '#1C1C1E',
            tertiary: '#2C2C2E',
            elevated: '#1C1C1E',
          },
          fill: {
            primary: 'rgba(120,120,128,0.36)',
            secondary: 'rgba(120,120,128,0.32)',
            tertiary: 'rgba(118,118,128,0.24)',
            quaternary: 'rgba(116,116,128,0.18)',
          },
          separator: 'rgba(84,84,88,0.65)',
          blue: '#0A84FF',
          green: '#30D158',
          indigo: '#5E5CE6',
          orange: '#FF9F0A',
          pink: '#FF375F',
          purple: '#BF5AF2',
          red: '#FF453A',
          teal: '#64D2FF',
          yellow: '#FFD60A',
          cyan: '#5AC8FA',
        },
        label: {
          primary: '#FFFFFF',
          secondary: 'rgba(235,235,245,0.6)',
          tertiary: 'rgba(235,235,245,0.3)',
          quaternary: 'rgba(235,235,245,0.18)',
        },
        gray: {
          1: '#8E8E93',
          2: '#636366',
          3: '#48484A',
          4: '#3A3A3C',
          5: '#2C2C2E',
          6: '#1C1C1E',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ios-mesh': 'linear-gradient(135deg, rgba(10,132,255,0.08) 0%, rgba(94,92,230,0.06) 50%, rgba(191,90,242,0.04) 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
      },
      borderRadius: {
        'ios': '12px',
        'ios-lg': '16px',
        'ios-xl': '20px',
      },
      boxShadow: {
        'ios': '0 2px 10px rgba(0,0,0,0.3)',
        'ios-lg': '0 8px 30px rgba(0,0,0,0.4)',
        'ios-elevated': '0 4px 20px rgba(0,0,0,0.5)',
        'ios-glow': '0 0 30px rgba(10,132,255,0.15)',
      },
    },
  },
  plugins: [],
};
