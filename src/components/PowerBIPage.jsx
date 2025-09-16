import React from "react";
import { useNavigate } from "react-router-dom";
import PowerBIEmbed from "./common/PowerBIEmbed";

export default function PowerBIPage({
  embedUrl,
  title = "لوحة مؤشرات Power BI",
}) {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F6F9FF]">
      <header
        className="sticky top-0 z-10 text-white"
        style={{ background: "linear-gradient(135deg,#1691D0,#15508A)" }}
      >
        <div className="w-full px-4 py-3 flex items-center gap-3">
          <div className="font-bold">{title}</div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={embedUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 border rounded-xl bg-white/10 text-white"
              title="فتح في تبويب جديد"
            >
              فتح في تبويب
            </a>
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 border rounded-xl bg-white/10 text-white"
            >
              عودة للوحة الإدارة
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* fluid container – no max width */}
        <div className="p-3 md:p-4">
          <div className="rounded-2xl overflow-hidden bg-white shadow">
            {/* height uses viewport (set in the component) */}
            <PowerBIEmbed embedUrl={embedUrl} />
          </div>
        </div>
      </main>
    </div>
  );
}
