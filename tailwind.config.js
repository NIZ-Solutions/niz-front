// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
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
        "kakao-yellow": "#FEE500",
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
          "@apply bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#126DD7] to-[#0F9AFB]":
            "",
        },
        ".intro-gradient": {
          "@apply bg-gradient-to-b from-[#ffffff]/0 from-0% via-[#126DD7] via-50% to-[#ffffff]/0 to-100%":
            "",
        },
        ".sign-input": {
          "@apply border-b-[1.5px] border-gray-001 py-[6px] text-xl focus:border-blue-001":
            "",
        },
      });
    },
  ],
};
