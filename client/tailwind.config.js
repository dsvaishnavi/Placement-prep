/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    colors: {
      /* Brand Core */
      primary: '#0B3C8A',        // Main brand blue (headers, icons)
      primarySoft: '#EAF2FF',    // Light blue card backgrounds
      primaryAccent: '#2F6BFF', // Progress bars, highlights

      /* Neutrals */
      background: '#F6F8FC',    // Page background
      surface: '#FFFFFF',       // Card surface
      border: '#E3E8F2',         // Card borders
      muted: '#6B7280',         // Secondary text

      /* Status */
      success: '#16A34A',
      warning: '#F59E0B',
      info: '#2563EB'
    }
  }
}
,
  plugins: [],
}

