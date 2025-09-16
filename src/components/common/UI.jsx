

// =============================
// src/components/common/UI.jsx
// Small shared UI atoms: BrandStyles + Card
// =============================


import React from "react";


export const BrandStyles = () => (
<style>{`
:root{--brand:#1691D0;--brand-dark:#15508A;--brand-alt:#3AC0C3}
*{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}
.brand-gradient{background:linear-gradient(135deg,var(--brand),var(--brand-dark))}
.btn{border-radius:1rem;padding:.6rem 1rem;display:inline-flex;align-items:center;gap:.5rem}
.btn-primary{background:var(--brand);color:#fff}
.btn-ghost{border:1px solid #e5e7eb;background:#fff}
`}</style>
);


export function Card({ title, children, actions }) {
return (
<div className="p-4 rounded-2xl shadow bg-white">
<div className="flex items-center gap-2 mb-2">
{title && <div className="font-semibold">{title}</div>}
<div className="ml-auto flex gap-2">{actions}</div>
</div>
{children}
</div>
);
}