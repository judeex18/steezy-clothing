"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Don't show header on login page (/admin)
  const isLoginPage = pathname === "/admin";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isLoginPage && <AdminHeader />}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
