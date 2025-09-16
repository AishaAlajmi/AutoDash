import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PublicDailyForm from "./common/PublicDailyForm";
import AdminDashboardEntries from "./common/AdminDashboardEntries";

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: 12,
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: 12,
        }}
      >
        <Link to="/">نموذج الإدخال</Link>
        <Link to="/dashboard">لوحة المتابعة</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PublicDailyForm />} />
        <Route path="/dashboard" element={<AdminDashboardEntries />} />
      </Routes>
    </BrowserRouter>
  );
}
