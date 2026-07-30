import type { ReactNode } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-6 flex justify-end">
            <LogoutButton />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}