import React from "react";
import { Search, Bell, Menu, Command } from "lucide-react";
import { NAV } from "@/constants/testIds";

interface TopbarProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export const Topbar = ({ title, subtitle, onMenuClick }: TopbarProps) => {
  return (
    <header
      data-testid={NAV.topbar}
      className="h-16 flex items-center justify-between gap-4 px-4 lg:px-6 border-b border-scout-border bg-white/85 backdrop-blur-md sticky top-0 z-20"
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          data-testid={NAV.sidebarToggle}
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden w-9 h-9 rounded-md flex items-center justify-center text-scout-text-secondary hover:bg-scout-bg"
        >
          <Menu className="w-4 h-4" strokeWidth={2} />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-scout-text truncate">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs text-scout-text-secondary truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <label className="hidden sm:flex items-center gap-2 bg-scout-bg border border-scout-border rounded-md px-3 py-1.5 min-w-[220px] lg:min-w-[280px] focus-within:ring-2 focus-within:ring-scout-primary/20 focus-within:border-scout-primary transition-all">
          <Search
            className="w-3.5 h-3.5 text-scout-text-secondary flex-shrink-0"
            strokeWidth={2}
            aria-hidden
          />

          <input
            data-testid={NAV.topbarSearch}
            type="text"
            placeholder="Search research..."
            aria-label="Search research"
            className="bg-transparent flex-1 outline-none text-sm placeholder-scout-text-secondary/80 text-scout-text"
          />

          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] text-scout-text-secondary bg-white border border-scout-border rounded px-1.5 py-0.5 font-mono">
            <Command className="w-2.5 h-2.5" strokeWidth={2} />K
          </kbd>
        </label>

        <button
          data-testid={NAV.topbarNotifications}
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-md flex items-center justify-center text-scout-text-secondary hover:text-scout-text hover:bg-scout-bg transition-colors"
        >
          <Bell className="w-4 h-4" strokeWidth={2} />

          <span
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-scout-primary ring-2 ring-white"
            aria-hidden
          />
        </button>

        <button
          data-testid={NAV.topbarAvatar}
          aria-label="User menu"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-scout-primary to-[#7C3AED] flex items-center justify-center text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          AS
        </button>
      </div>
    </header>
  );
};
