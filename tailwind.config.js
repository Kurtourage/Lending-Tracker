// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',       // dark blue
        primarylight: '#3B82F6',  // light blue
        cream: '#FFFDEB',         // background cream
      },
    },
  },
  plugins: [],
};
