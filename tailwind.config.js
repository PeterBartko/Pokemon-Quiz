module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slide: 'go 15s linear', 
        appear: 'appear .15s ease-in-out' 
      },
      keyframes: {
        go: {
          from: {
            width: '0px'
          },
          to: {
            width: '560px'
          }
        },
        appear: {
          from: {
            transform: 'scale(.95)'
          },
          to: {
            transform: 'scale(1)'
          }
        }
      }
    },
  },
  plugins: [],
}
