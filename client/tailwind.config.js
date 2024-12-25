/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
      colors: {
        lightGray: '#f9f9f9', // Background color of the dashboard
        cardBackground: '#ffffff', // Card background
        textDark: '#333333', // Primary text color
        textLight: '#666666', // Secondary text color
        sidebarBg: '#ffffff', // Sidebar background color
        headerBg: '#f2f2f2', // Header background color
        primary: '#5b85d6', // Primary button and icon color
        borderColor: '#eaeaea', // Border color
      },
    },
  },
  plugins: [],
}