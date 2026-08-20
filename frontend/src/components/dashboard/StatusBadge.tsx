import React from "react";
import { Check, Clock, Loader2, AlertTriangle } from "lucide-react";

type Status = "pending" | "processing" | "completed" | "failed";

interface StatusStyle {
  label: string;
  classes: string;
  Icon: React.ElementType;
  iconClass: string;
}

const STYLES: Record<Status, StatusStyle> = {
  pending: {
    label: "Pending",
    classes: "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]",
    Icon: Clock,
    iconClass: "",
  },
  processing: {
    label: "Processing",
    classes: "bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]",
    Icon: Loader2,
    iconClass: "animate-spin",
  },
  completed: {
    label: "Completed",
    classes: "bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]",
    Icon: Check,
    iconClass: "",
  },
  failed: {
    label: "Failed",
    classes: "bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]",
    Icon: AlertTriangle,
    iconClass: "",
  },
};

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const cfg = STYLES[status] || STYLES.pending;
  const { Icon } = cfg;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}
      data-testid={`status-badge-${status}`}
    >
      <Icon
        className={`w-3 h-3 ${cfg.iconClass}`}
        strokeWidth={2.25}
        aria-hidden
      />
      {cfg.label}
    </span>
  );
};
