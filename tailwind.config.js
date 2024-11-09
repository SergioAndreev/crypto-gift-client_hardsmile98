/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      sm: '13px',
      base: '17px',
      xl: '24px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Основные цвета
      white: '#FFFFFF',
      black: '#000000',
      primary: {
        light: '#007AFF',
        dark: '#0A84FF',
      },
      accent: {
        blue: {
          light: '#007AFF',
          dark: '#0A84FF',
        },
        cyan: {
          light: '#5AC8FA',
          dark: '#64D2FF',
        },
        gold: {
          light: '#F1AA05',
          dark: '#FFD60A',
        },
        purple: {
          light: '#AF51DE',
          dark: '#BF5AF2',
        },
        green: {
          light: '#35C759',
          dark: '#30D158',
        },
      },
      // Системные цвета
      separator: {
        light: '#B3B3B5',
        dark: '#303035',
      },
      icons: {
        light: '#959595',
        dark: '#919191',
      },
      label: {
        primary: {
          light: '#000000',
          dark: '#FFFFFF',
        },
        secondary: {
          light: '#8E8E93',
          dark: '#8E8E93',
        },
        tabbar: {
          light: '#8D8D8F',
          dark: '#919191',
        },
        date: {
          light: '#6D6D71',
          dark: '#98989D',
        },
      },
      bg: {
        primary: {
          light: '#FFFFFF',
          dark: '#1C1C1E',
        },
        secondary: {
          light: '#EFEFF3',
          dark: '#2C2C2E',
        },
        notification: {
          light: '#555555',
          dark: '#060606',
        },
        tabbar: {
          light: '#F2F2F2',
          dark: '#1F1E1F',
        },
      },
    },
    extend: {
      backgroundImage: {
        'tg-pattern': "url('/src/assets/images/tg-patter.svg')",
      },
    },
  },
  plugins: [],
};
