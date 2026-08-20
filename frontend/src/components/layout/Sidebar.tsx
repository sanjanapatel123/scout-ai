import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  History,
  Settings,
  Radar,
  X,
} from "lucide-react";
import { NAV } from "@/constants/testIds";

type IconComponent = React.ElementType;

interface NavItem {
  key: string;
  to: string;
  label: string;
  Icon: IconComponent;
}

interface SidebarInnerProps {
  onNavigate?: () => void;
}

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "dashboard",
    to: "/",
    label: "Dashboard",
    Icon: LayoutDashboard,
  },
  {
    key: "research",
    to: "/research",
    label: "Research",
    Icon: Search,
  },
  {
    key: "history",
    to: "/history",
    label: "History",
    Icon: History,
  },
  {
    key: "settings",
    to: "/settings",
    label: "Settings",
    Icon: Settings,
  },
];

const SidebarInner = ({ onNavigate }: SidebarInnerProps) => {
  return (
    <div className="h-full flex flex-col justify-between bg-white">
      <div>
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-scout-border">
          <div className="w-8 h-8 rounded-md bg-scout-text flex items-center justify-center">
            <Radar className="w-4 h-4 text-white" strokeWidth={2.25} />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold text-scout-text tracking-tight">
              ScoutAI
            </span>

            <span className="text-[10px] text-scout-text-secondary mt-0.5">
              Lead intelligence
            </span>
          </div>
        </div>

        <nav className="p-3 space-y-0.5" aria-label="Main">
          {NAV_ITEMS.map(({ key, to, label, Icon }) => (
            <NavLink
              key={key}
              to={to}
              end={to === "/"}
              data-testid={NAV.sidebarItem(key)}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-scout-bg text-scout-text font-medium"
                    : "text-scout-text-secondary hover:text-scout-text hover:bg-scout-bg/70"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive
                        ? "text-scout-primary"
                        : "text-scout-text-secondary group-hover:text-scout-text"
                    }`}
                    strokeWidth={2}
                  />

                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-scout-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-md">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-scout-primary to-[#7C3AED] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            AS
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-scout-text truncate">
              Alex Sinclair
            </div>

            <div className="text-xs text-scout-text-secondary truncate">
              Pro workspace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = () => (
  <aside
    data-testid={NAV.sidebar}
    className="hidden md:flex md:flex-col w-60 lg:w-64 flex-shrink-0 border-r border-scout-border bg-white"
  >
    <SidebarInner />
  </aside>
);

export const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-scout-text/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-72 max-w-[80vw] h-full bg-white border-r border-scout-border shadow-scout-md animate-fade-up">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-4 right-3 w-8 h-8 rounded-md flex items-center justify-center text-scout-text-secondary hover:bg-scout-bg"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        <SidebarInner onNavigate={onClose} />
      </div>
    </div>
  );
};
