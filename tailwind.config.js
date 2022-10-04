/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-profile-bg": "url('/img/profile/hero-profile.webp')",
      },
    },
  },
  plugins: [],
}