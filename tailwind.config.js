// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard"],
      },
      colors: {
        "blue-000": "#0F9AFB",
        "blue-001": "#126DD7",
        "white-000": "#FFFFFF",
        "gray-000": "#F5F5F5",
        "gray-001": "#D0D0D0",
        "gray-002": "#A0A0A0",
        "gray-003": "#6B6464",
        "black-000": "#232121",
        "red-000": "#FF0000",
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-logo": {
          "@apply text-[20px] font-black": "",
        },
        ".main-gradient": {
          "@apply bg-gradient-to-r from-[#126DD7] to-[#0F9AFB]": "",
        },
      });
    },
  ],
};
