/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-150': 'repeat(auto-fill, minmax(150px, 1fr))',
        'auto-fit-150': 'repeat(auto-fit, minmax(150px, 1fr))',
      },
      colors: {
        black: '#050505',
      },
      animation: {
        slidedown: 'slidedown 0.3s ease-in-out',
        slideleft: 'slideleft 0.3s ease-in-out',
        slideright: 'slideright 0.5s ease-in-out',
        wave: 'wave 0.5s linear infinite',
        slowfade: 'slowfade 0.5s ease-in-out',
        popin: 'popin 0.5s ease-in-out',
        slideup: 'slideup 0.5s ease-in-out',
        showmessage: 'showmessage 1s ease',
        sliderightfull: 'sliderightfull 1s ease',
        slideleftfull: 'slideleftfull 1s ease',
        popinslideright: 'popinslideright 1s ease'
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        popin: {
          from: {opacity: 0, transform: 'scale(0.8)'},
          to: {opacity: 1, transform: 'scale(1)'}
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        popinslideright: {
          '0%': { opacity: 0, transform: 'scale(0.5) translateX(75%)' },
          '50%': { opacity: 1, transform: 'scale(1) translateX(75%)'},
          '100%': { opacity: 1, transform: 'scale(1) translateX(0%)'}
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        showmessage: {
          '0%': { transform: 'translateY(calc(100% + 20px))', opacity: 0 },
          '20%': { transform: 'translateY(0)', opacity: 1},
          '80%': { transform: 'translateY(0)', opacity: 1},
          '100%': { transform: 'translateY(calc(100% + 20px))', opacity: 0 }
        },
        sliderightfull: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideleftfull: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
    },
  },
};
