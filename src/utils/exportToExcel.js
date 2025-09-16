/**
 * Builds an HTML table and triggers a download as legacy .xls (Excel-compatible).
 */
export default function exportToExcel(rows) {
  const headers = [
    "التاريخ", "المنشأة", "المركز", "المدرسة", "الجنس", "السلطة", "المرحلة", "إجمالي المدرسة", "مطعّم", "رفض", "غياب", "غير مطعّم", "البريد"
  ];
  
  const table = [headers].concat(
    rows.map(r => [
      r.date, r.facility, r.center, r.school,
      r.sex || "", r.authority || "", r.stage || "",
      r.schoolTotal || 0, r.vaccinated || 0, r.refused || 0, r.absent || 0, r.unvaccinated || 0, r.email
    ])
  );

  const html = `\uFEFF<html><head><meta charset="utf-8" /></head><body><table>${table.map(row => `<tr>${row.map(cell => `<td>${String(cell).replace(/</g,'&lt;')}</td>`).join('')}</tr>`).join('')}</table></body></html>`;
  
  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `hpv-export-${todayStr()}.xls`; // Filename includes today's date
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
