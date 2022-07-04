/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minHeight: {
      '85': '100vh',
    },
    extend: {
      colors: {
        'half-transparent': 'rgb(0,0,0,0.8)',
        'half-transparent2': 'rgb(0,0,0,0.9)',
        'brown-transparent': 'rgb(163, 163, 163, 0.5)',
      },

      backgroundImage: {
        'coin': "url('./images/wallet.jpg')",
      },

      spacing: {
        'screen15': '15vw',
        'screenx83': '82.5vw',
        'screen85': '85vh',
        'x9vw': '9vw',
      }
    },
  },
  plugins: [],
}
