import { ReactNode, useState } from "react";
import { AdminSidebar, MobileHeader } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-14 lg:pt-0 lg:ml-64 p-4 md:p-6 lg:p-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
