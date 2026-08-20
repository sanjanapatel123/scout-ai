import React from "react";
import { Database, Loader2, CheckCircle2, XOctagon } from "lucide-react";
import { STATS } from "@/constants/testIds";

type ResearchStatus = "pending" | "processing" | "completed" | "failed";

interface ResearchRecord {
  status: ResearchStatus;
}

interface CardProps {
  testId: string;
  label: string;
  value: number;
  sub?: string;
  Icon: React.ElementType;
  accent: string;
}

const Card = ({ testId, label, value, sub, Icon, accent }: CardProps) => {
  return (
    <div
      data-testid={testId}
      className="bg-white border border-scout-border rounded-lg p-5 shadow-scout-sm hover:shadow-scout-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-scout-text-secondary uppercase tracking-wider">
          {label}
        </span>

        <span
          className="w-8 h-8 rounded-md flex items-center justify-center"
          style={{
            backgroundColor: `${accent}14`,
            color: accent,
          }}
        >
          <Icon className="w-4 h-4" strokeWidth={2} />
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-scout-text tracking-tight tabular-nums">
          {value}
        </span>

        {sub && (
          <span className="text-xs text-scout-text-secondary">{sub}</span>
        )}
      </div>
    </div>
  );
};

interface StatsCardsProps {
  records: ResearchRecord[];
}

export const StatsCards = ({ records }: StatsCardsProps) => {
  const total = records.length;

  const processing = records.filter(
    (r) => r.status === "pending" || r.status === "processing",
  ).length;

  const completed = records.filter((r) => r.status === "completed").length;

  const failed = records.filter((r) => r.status === "failed").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        testId={STATS.total}
        label="Total Research"
        value={total}
        sub="all time"
        Icon={Database}
        accent="#4F46E5"
      />

      <Card
        testId={STATS.processing}
        label="Processing"
        value={processing}
        sub={processing === 1 ? "job in flight" : "jobs in flight"}
        Icon={Loader2}
        accent="#0EA5E9"
      />

      <Card
        testId={STATS.completed}
        label="Completed"
        value={completed}
        sub="successful runs"
        Icon={CheckCircle2}
        accent="#16A34A"
      />

      <Card
        testId={STATS.failed}
        label="Failed"
        value={failed}
        sub="need attention"
        Icon={XOctagon}
        accent="#DC2626"
      />
    </div>
  );
};
