import type { ReactNode } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

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

          {children}

        </main>

      </div>

    </div>
  );
}