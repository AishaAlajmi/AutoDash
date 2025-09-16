// =============================================
// filepath: src/components/common/PowerBIEmbed.jsx
// =============================================
import React from "react";

export default function PowerBIEmbed({
  embedUrl,
  title = "Power BI",
  width = "100%",
  height = "80vh",
}) {
  if (!embedUrl) {
    return (
      <div className="p-6 text-center text-slate-600">
        لم يتم ضبط رابط لوحة Power BI بعد.
      </div>
    );
  }

  return (
    <iframe
      title={title}
      src={embedUrl}
      width={width}
      height={height}
      style={{ border: 0, display: "block" }}
      allowFullScreen
    />
  );
}
