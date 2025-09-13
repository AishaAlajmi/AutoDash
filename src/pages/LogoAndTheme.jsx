// File: src/pages/BrandingAndTheme.jsx
/***********************************
 * Branding (name + animated logo)
 ***********************************/
import React from "react";

export const BRAND_NAME = "AutoDash";
export const LogoMark = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className="shrink-0"
    xmlns="http://www.w3.org/2000/svg"
  >
       {" "}
    <defs>
           {" "}
      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />     {" "}
      </linearGradient>
         {" "}
    </defs>
       {" "}
    <g>
            <circle cx="20" cy="20" r="10" fill="url(#lg1)"></circle>     {" "}
      <g opacity="0.9">
               {" "}
        <rect x="30" y="30" width="8" height="8" rx="2" fill="var(--primary)" />
               {" "}
        <rect x="42" y="30" width="8" height="8" rx="2" fill="var(--primary)" />
               {" "}
        <rect x="30" y="42" width="8" height="8" rx="2" fill="var(--primary)" />
               {" "}
        <rect x="42" y="42" width="8" height="8" rx="2" fill="var(--primary)" />
             {" "}
      </g>
         {" "}
    </g>
     {" "}
  </svg>
);

/***********************************
 * Theme tokens
 ***********************************/
export const themes = {
  Light: {
    name: "Light",
    background: "bg-slate-50",
    text: "text-slate-900",
    cardBg: "bg-white/80 backdrop-blur",
    cardText: "text-slate-900",
    dropdownBg: "bg-white/90",
    dropdownText: "text-slate-800",
    dropdownBorder: "border-slate-300",
    iconBg: "rgba(0,0,0,0.1)",
    sidebarBg: "bg-slate-950",
    sidebarText: "text-slate-100",
    primary: "#7c3aed",
    secondary: "#06b6d4",
    accent: "#f59e0b",
    chartColors: [
      "#7c3aed",
      "#06b6d4",
      "#f59e0b",
      "#ef4444",
      "#22c55e",
      "#3b82f6",
      "#eab308",
    ],
    tooltipBg: "#0f172a",
    tooltipText: "#ffffff",
    chatUserBg: "bg-white",
    chatAiBg: "bg-slate-100",
    chatBorder: "border-slate-300",
  },
  Dark: {
    name: "Dark",
    chatUserBg: "bg-slate-700",
    chatAiBg: "bg-slate-800",
    chatBorder: "border-slate-700",
    dropdownBg: "bg-slate-800/90",
    dropdownText: "text-slate-100",
    dropdownBorder: "border-slate-700",
    background: "bg-slate-950",
    text: "text-white",
    cardBg: "bg-slate-900/70 backdrop-blur",
    cardText: "text-slate-100",
    iconBg: "rgba(255,255,255,0.1)",
    sidebarBg: "bg-black",
    sidebarText: "text-slate-100",
    primary: "#60a5fa",
    secondary: "#34d399",
    accent: "#f472b6",
    chartColors: [
      "#60a5fa",
      "#34d399",
      "#fbbf24",
      "#fb7185",
      "#818cf8",
      "#2dd4bf",
      "#facc15",
    ],
    tooltipBg: "#1f2937",
    tooltipText: "#ffffff",
  },
  Colorful: {
    name: "Colorful",
    dropdownBg: "bg-white/90",
    dropdownText: "text-slate-800",
    dropdownBorder: "border-slate-300",
    background: "bg-fuchsia-50",
    text: "text-slate-900",
    cardBg: "bg-white/80 backdrop-blur",
    cardText: "text-slate-900",
    iconBg: "rgba(0,0,0,0.1)",
    sidebarBg: "bg-fuchsia-700",
    sidebarText: "text-white",
    chatUserBg: "bg-white",
    chatAiBg: "bg-fuchsia-50",
    chatBorder: "border-fuchsia-200",
    primary: "#c026d3",
    secondary: "#db2777",
    accent: "#f43f5e",
    chartColors: [
      "#c026d3",
      "#db2777",
      "#f43f5e",
      "#ef4444",
      "#f97316",
      "#eab308",
      "#84cc16",
    ],
    tooltipBg: "#ffffff",
    tooltipText: "#0f172a",
  },
};

export const chartOptions = ["bar", "line", "area", "pie", "composed", "hbar"];
