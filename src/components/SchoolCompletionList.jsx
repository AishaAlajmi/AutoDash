import React, { useMemo } from "react";

/** Build a stable key for a school */
function keyOf(r) {
  return [
    (r.email || "").toLowerCase(),
    r.facility || "",
    // prefer clinic_name/school_name if present
    r.clinic_name || r.center || "",
    r.school_name || r.school || "",
  ].join("|");
}

/** Aggregate totals per school from already-loaded rows */
function computeSchoolCompletion(rows, emailFilter) {
  const acc = new Map();

  (rows || []).forEach((r) => {
    // only the signed-in user's rows (same logic as MyRecordsSmart)
    if ((r.email ?? "").toLowerCase() !== (emailFilter ?? "").toLowerCase()) return;

    // ignore "places" like سجون/مولات where clinic_name is "اخرى"
    const clinicName = r.clinic_name ?? r.center ?? "";
    if (clinicName.trim() === "اخرى") return;

    const schoolName = r.school_name ?? r.school ?? "";
    if (!schoolName) return;

    const k = keyOf(r);
    if (!acc.has(k)) {
      acc.set(k, {
        email: r.email || "",
        facility: r.facility || "",
        clinic_name: clinicName,
        school_name: schoolName,
        total: Number(r.school_total ?? r.schoolTotal ?? 0) || 0,
        vaccinated: 0,
      });
    }
    const item = acc.get(k);
    item.vaccinated += Number(r.vaccinated ?? 0);

    // keep the maximum total we ever saw (in case some rows had 0)
    const t = Number(r.school_total ?? r.schoolTotal ?? 0) || 0;
    if (t > item.total) item.total = t;
  });

  // compute remaining/completed
  const list = Array.from(acc.values()).map((it) => {
    const remaining = Math.max((it.total || 0) - (it.vaccinated || 0), 0);
    return {
      ...it,
      remaining,
      completed: it.total > 0 && it.vaccinated >= it.total,
    };
  });

  // sort: not completed first, then by remaining desc
  list.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return (b.remaining || 0) - (a.remaining || 0);
  });

  return list;
}

export default function SchoolCompletionList({ rows, email }) {
  const items = useMemo(() => computeSchoolCompletion(rows, email), [rows, email]);

  const done = items.filter((i) => i.completed).length;
  const total = items.length;

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="font-semibold text-slate-800">إنجاز المدارس</div>
        <div className="ml-auto text-sm text-slate-500">
          مكتمل: {done} / {total}
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-right">
              <th className="p-2">المركز</th>
              <th className="p-2">المدرسة</th>
              <th className="p-2">إجمالي المدرسة</th>
              <th className="p-2">المطعّم حتى الآن</th>
              <th className="p-2">المتبقي</th>
              <th className="p-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={[r.email, r.facility, r.clinic_name, r.school_name].join("|")} className="border-b hover:bg-slate-50">
                <td className="p-2">{r.clinic_name}</td>
                <td className="p-2">{r.school_name}</td>
                <td className="p-2">{r.total}</td>
                <td className="p-2">{r.vaccinated}</td>
                <td className="p-2">{r.remaining}</td>
                <td className="p-2">
                  {r.completed ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200">
                      مكتمل
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-50 text-yellow-700 border border-yellow-200">
                      غير مكتمل
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td className="p-3 text-center text-slate-500" colSpan={6}>لا توجد مدارس لحساب الإنجاز.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
