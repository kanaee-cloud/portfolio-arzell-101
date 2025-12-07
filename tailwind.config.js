module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Lexend',
      secondary: 'Lexend',
      tertiary: 'Lexend',
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
        auroraMotion: "aurora 20s ease-in-out infinite",
        auroraMotionSlow: "aurora 30s ease-in-out infinite",
        auroraMotionReverse: "aurora 25s ease-in-out infinite reverse",
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-20%, -10%) rotate(30deg)' },
        },
      },
      colors: {
        gray: "#212121",
        primary: '#0a0a0a',
        light: '#E4F1FF',
        accent: '	#0092ff',
      },
      backgroundImage: {
        about: "url('./assets/about.jpg')",
        footer: "linear-gradient(rgba(30, 30, 32, 0.7),rgba(30, 30, 32, 0.7)),url(./assets/footer.gif)",
        main: "linear-gradient(rgba(30, 30, 32, 0.7),rgba(30, 30, 32, 0.7)),url(./assets/bg-main.jpg)",
        gradientRadial: "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
