// =============================================
// filepath: src/router/AppRouter.jsx
// =============================================
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HPVDemo from "../HPVDemo.jsx";
import PowerBIPage from "../components/PowerBIPage.jsx";
const POWER_BI_PUBLIC_URL =
  import.meta.env.VITE_POWER_BI_PUBLIC_URL ||
  "https://app.powerbi.com/view?r=eyJrIjoiZTExOTQ4N2MtOWRmZi00MzlhLTg4ZDAtNWU3ZTcxOGVlM2ZlIiwidCI6IjJkMzE5NGUzLTE2NTQtNDZiZC1iYWUyLWFkMzdiYTExYjBhZSIsImMiOjl9";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app */}
        <Route path="/" element={<HPVDemo />} />
        {/* Power BI embed page */}
        <Route path="/pbi" element={<PowerBIPage embedUrl={POWER_BI_PUBLIC_URL} />} />
      </Routes>
    </BrowserRouter>
  );
}
