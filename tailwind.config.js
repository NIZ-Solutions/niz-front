// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        bh: {
          raw: "(min-height: 600px)",
        },
      },
      animation: {
        border: "border 4s linear infinite",
        loading: "loading 5s infinite",
        typing: "typing 3s steps(20) infinite alternate, blink .7s infinite",
        fadein: "fadein 2s",
      },
      keyframes: {
        fadein: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg) translateX(6%) rotate(0deg)" },
          "50%": { transform: "rotate(180deg) translateX(6%) rotate(-180deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(6%) rotate(-360deg)",
          },
        },
        moveVertical: {
          "00%": { transform: "translateY(-40%)" },
          "50%": { transform: "translateY(40%)" },
          "100%": { transform: "translateY(-40%)" },
        },
        moveHorizontal: {
          "0%": { transform: "translateX(35%)" },
          "65%": { transform: "translateX(-35%)" },
          "100%": { transform: "translateX(35%)" },
        },
        border: {
          to: { "--border-angle": "360deg" },
        },
        loading: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      fontFamily: {
        sans: ["Pretendard"],
      },
      colors: {
        "yellow-001": "#ffec33",
        "blue-000": "#0F9AFB",
        "blue-001": "#126DD7",
        "white-000": "#FFFFFF",
        "gray-000": "#F5F5F5",
        "gray-001": "#D0D0D0",
        "gray-002": "#A0A0A0",
        "gray-003": "#6B6464",
        "gray-004": "#4e4e4e",
        "gray-005": "#2e2e2e",
        "black-000": "#232121",
        "black-001": "#1a1919",
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
        ".back-glass": {
          "@apply glowing-border border-2 bg-black/5 shadow-lg ring-1 ring-black/5 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur-md":
            "",
        },
        ".back-glass-red": {
          "@apply glowing-border-red border-2 bg-black/5 shadow-lg ring-1 ring-black/5 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur-md":
            "",
        },
        ".btn-glass": {
          "@apply relative items-center justify-center hover:drop-shadow": "",
        },
        ".btn-glass-span": {
          "@apply bg-black/5 glowing-border inline-flex w-full items-center justify-center px-6 py-[11px] text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm":
            "",
        },
        ".btn-glass-span-slim": {
          "@apply glowing-border inline-flex w-full items-center justify-center px-6 py-1.5 text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm":
            "",
        },
        ".btn-glass-span-modal": {
          "@apply bg-black/5 glowing-border inline-flex w-full items-center justify-center px-6 py-[8px] text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm":
            "",
        },
        ".btn-glass-span-active": {
          "@apply glowing-border-active inline-flex w-full items-center justify-center px-6 py-3 text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm":
            "",
        },
        ".btn-glass-span-slim-active": {
          "@apply glowing-border-active inline-flex w-full items-center justify-center px-6 py-1.5 text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm":
            "",
        },
        ".btn-glass-span-modal-active": {
          "@apply glowing-border-active inline-flex w-full items-center justify-center px-6 py-[8px] text-white shadow-lg ring-1 ring-black/5 backdrop-blur-sm backdrop-saturate-150 transition-transform duration-300 ease-out active:scale-[0.97] group-hover:scale-[0.985] supports-[backdrop-filter]:backdrop-blur-sm":
            "",
        },
      });
    },
  ],
};
