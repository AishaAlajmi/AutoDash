// File: src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedTheme,
  setSelectedTheme,
  currentTheme,
  dashboardData,
  onReset,
  onLoadSample,
  LogoMark,
  BRAND_NAME,
}) {
  const themeKeys = {
    Light: "Light",
    Dark: "Dark",
    Colorful: "Colorful",
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform transition-transform duration-300 md:relative md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col w-72 ${currentTheme.sidebarBg} ${
        currentTheme.sidebarText
      } shadow-2xl p-6 z-40 md:z-auto md:flex`}
    >
      <div className="flex items-center mb-8">
        <div className="p-2 rounded-xl bg-white/10 backdrop-blur mr-3">
          <LogoMark size={36} />
        </div>
        <span className="text-2xl font-extrabold tracking-tight">
          {BRAND_NAME}
        </span>
      </div>

      <div className="mb-6">
        <div className="text-xs font-semibold uppercase opacity-70 tracking-wider mb-2">
          Themes
        </div>
        <div className="flex flex-col space-y-2">
          {Object.entries(themeKeys).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSelectedTheme(k)}
              className={`py-2 px-4 rounded-xl text-left transition-all duration-200 font-medium ${
                selectedTheme === k
                  ? "bg-white/10 ring-2 ring-white/20"
                  : "hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {!dashboardData ? (
        <div className="mt-auto space-y-3">
          <button
            onClick={onLoadSample}
            className="w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 text-slate-900"
            style={{ backgroundColor: "#ffffff" }}
          >
            Load Sample Data
          </button>
          <p className="text-xs opacity-70">
            Tip: you can try AutoDash without uploading anything.
          </p>
        </div>
      ) : (
        <button
          onClick={onReset}
          className="mt-auto w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 text-white"
          style={{ backgroundColor: currentTheme.primary }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
