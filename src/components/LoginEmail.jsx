import React, { useState } from "react";

// Local debug (kept isolated)
const DEBUG = true;
const log = (...args) => {
  if (DEBUG) console.log("[LoginEmail]", ...args);
};

// Minimal shared Card (scoped to this file)
function Card({ title, children }) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      {title && <div className="font-semibold mb-2">{title}</div>}
      {children}
    </div>
  );
}

export default function LoginEmail({ onLogin, users }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const key = (email || "").toLowerCase().trim();
    const u = users[key];
    log("submit", { key, found: !!u });
    if (!u) {
      setError("هذا البريد غير مخوّل");
      return;
    }
    setError("");
    onLogin({ email: key, role: u.role, facility: u.facility });
  }

  return (
    <Card title="تسجيل الدخول">
      <form
        onSubmit={submit}
        className="flex flex-col md:flex-row gap-3 items-center"
      >
        <input
          placeholder="اكتب بريدك المعتمد"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-xl px-3 py-2 w-full md:w-96"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-2xl bg-black text-white"
        >
          سجل
        </button>
        {error && <span className="text-red-600">{error}</span>}
      </form>
      <div className="text-xs text-gray-500 mt-2">
     
      </div>
    </Card>
  );
}
