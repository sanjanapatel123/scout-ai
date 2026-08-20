import React, { ReactNode, useState } from "react";
import { Sidebar, MobileSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

interface DashboardLayoutProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export const DashboardLayout = ({
  title,
  subtitle,
  children,
}: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-scout-bg overflow-hidden">
      <Sidebar />

      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 scout-fade-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
