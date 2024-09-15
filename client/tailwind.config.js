/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        text: '#09100a',
        background: '#f2f8f3',
        primary: '#5eb569',
        secondary: '#9dd5a4',
        accent: '#76c881',
      },
    }
  },
  plugins: []
};