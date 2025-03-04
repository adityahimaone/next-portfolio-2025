/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - deep navy blue
        primary: {
          DEFAULT: 'rgb(39 50 129)', // #273281
          light: 'rgb(58 70 153)', // Lighter version
          dark: 'rgb(30 40 102)', // Darker version
        },
        // Secondary palette - lighter blue
        secondary: {
          DEFAULT: 'rgb(61 70 139)', // #3d468b
          light: 'rgb(80 90 163)', // Lighter version
          dark: 'rgb(51 59 116)', // Darker version
        },
        // Accent - golden amber for contrast and musical warmth
        accent: {
          DEFAULT: 'rgb(230 168 23)', // #E6A817
          light: 'rgb(242 188 54)', // Lighter version
          dark: 'rgb(204 146 10)', // Darker version
        },
        // Vinyl colors
        vinyl: {
          DEFAULT: 'rgb(25 31 71)', // Dark blue-black
          groove: 'rgb(43 51 94)', // Vinyl groove color
          label: 'rgb(254 243 199)', // Center label color
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-waveform': 'linear-gradient(90deg, var(--tw-gradient-stops))',
        'vinyl-grooves':
          'repeating-radial-gradient(circle at center, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px)',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        wave: 'wave 2.5s ease-in-out infinite',
        'equalizer-1': 'equalizer 1.5s ease-in-out infinite',
        'equalizer-2': 'equalizer 1.7s ease-in-out 0.2s infinite',
        'equalizer-3': 'equalizer 1.9s ease-in-out 0.4s infinite',
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.5)' },
        },
        equalizer: {
          '0%, 100%': { height: '0.75rem' },
          '50%': { height: '2rem' },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
      boxShadow: {
        vinyl:
          '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 0 4px rgba(0, 0, 0, 0.03) inset',
        glow: '0 0 15px 2px rgb(39 50 129)',
        'inner-strong': 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.2)',
      },
      // Set CSS custom properties
      variables: {
        '--primary': 'rgb(39 50 129)',
        '--primary-light': 'rgb(58 70 153)',
        '--primary-dark': 'rgb(30 40 102)',
        '--secondary': 'rgb(61 70 139)',
        '--secondary-light': 'rgb(80 90 163)',
        '--secondary-dark': 'rgb(51 59 116)',
        '--accent': 'rgb(230 168 23)',
        '--vinyl': 'rgb(25 31 71)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}
