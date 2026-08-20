import { useCallback, useEffect, useMemo, useState } from "react";

import { Filter } from "lucide-react";
import { toast } from "sonner";
import { SlideOver } from "@/components/layout/SlideOver";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResearchTable } from "@/components/dashboard/ResearchTable";
import { ResearchDetails } from "@/components/research/ResearchDetails";

import {
  listResearch,
  deleteResearch,
  getResearchById,
} from "@/services/research.service";

import { useResearchPolling } from "@/hooks/useResearchPolling";

export type ResearchStatus = "pending" | "processing" | "completed" | "failed";

export interface ResearchRecord {
  id: string;
  companyName?: string;
  websiteUrl: string;
  industry?: string;
  description?: string;
  services?: string[];
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: string[];
  aiSummary?: string;
  status: ResearchStatus;
  errorMessage?: string;
  createdAt: string;
  updatedAt?: string;
}

type FilterKey = "all" | "completed" | "processing" | "failed";

interface ResearchListResponse {
  success: boolean;
  message?: string;
  data?: ResearchRecord[];
}

interface ResearchDetailsResponse {
  success: boolean;
  message?: string;
  data?: ResearchRecord;
}

interface DeleteResearchResponse {
  success: boolean;
  message?: string;
}

const FILTERS: {
  key: FilterKey;
  label: string;
}[] = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "completed",
    label: "Completed",
  },
  {
    key: "processing",
    label: "In progress",
  },
  {
    key: "failed",
    label: "Failed",
  },
];

const History = () => {
  const [records, setRecords] = useState<ResearchRecord[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeRecord, setActiveRecord] = useState<ResearchRecord | null>(null);

  const [filter, setFilter] = useState<FilterKey>("all");

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const response = (await listResearch()) as ResearchListResponse;

      setRecords(
        response?.success && Array.isArray(response.data) ? response.data : [],
      );
    } catch {
      toast.error("Unable to load history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUpdate = useCallback((updated: ResearchRecord) => {
    setRecords((previous) => {
      const index = previous.findIndex((record) => record.id === updated.id);

      if (index === -1) {
        return previous;
      }

      const next = [...previous];

      next[index] = {
        ...next[index],
        ...updated,
      };

      return next;
    });

    setActiveRecord((previous) => {
      if (!previous || previous.id !== updated.id) {
        return previous;
      }

      return {
        ...previous,
        ...updated,
      };
    });
  }, []);

  useResearchPolling(records, handleUpdate, 2000);

  const handleView = useCallback(async (record: ResearchRecord) => {
    setActiveRecord(record);

    try {
      const response = (await getResearchById(
        record.id,
      )) as ResearchDetailsResponse;

      if (response?.success && response.data) {
        setActiveRecord(response.data);
      }
    } catch {
      toast.error("Unable to load research details.");
    }
  }, []);

  const handleDelete = useCallback(
    async (record: ResearchRecord) => {
      const previousRecords = records;

      setRecords((current) => current.filter((item) => item.id !== record.id));

      setActiveRecord((current) =>
        current?.id === record.id ? null : current,
      );

      try {
        const response = (await deleteResearch(
          record.id,
        )) as DeleteResearchResponse;

        if (!response?.success) {
          setRecords(previousRecords);

          toast.error("Unable to delete research.");

          return;
        }

        toast.success("Research deleted successfully.");
      } catch {
        setRecords(previousRecords);

        toast.error("Unable to delete research.");
      }
    },
    [records],
  );

  const filtered = useMemo(() => {
    const sorted = [...records].sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    );

    if (filter === "all") {
      return sorted;
    }

    if (filter === "processing") {
      return sorted.filter(
        (record) =>
          record.status === "pending" || record.status === "processing",
      );
    }

    return sorted.filter((record) => record.status === filter);
  }, [records, filter]);

  const activeFilterLabel = FILTERS.find((item) => item.key === filter)?.label;

  return (
    <DashboardLayout
      title="History"
      subtitle="Every research job you've ever kicked off"
    >
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-2 flex items-center gap-1.5 text-xs text-scout-text-secondary">
          <Filter className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />

          <span>Filter</span>
        </div>

        {FILTERS.map((item) => {
          const isActive = filter === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              data-testid={`history-filter-${item.key}`}
              aria-pressed={isActive}
              className={[
                "rounded-md border px-3 py-1.5",
                "text-xs font-medium",
                "transition-colors duration-150",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-scout-primary",
                "focus-visible:ring-offset-2",
                isActive
                  ? "border-scout-text bg-scout-text text-white"
                  : "border-scout-border bg-white text-scout-text-secondary hover:bg-scout-bg hover:text-scout-text",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Research Table */}
      <ResearchTable
        records={filtered}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
        title="All research"
        subtitle={
          filter === "all"
            ? "Sorted by newest first."
            : `Filtered by "${activeFilterLabel}"`
        }
      />

      {/* Research Details Sheet */}
      <Sheet
        open={Boolean(activeRecord)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveRecord(null);
          }
        }}
      >
        <SlideOver
          open={Boolean(activeRecord)}
          onClose={() => setActiveRecord(null)}
          ariaLabel="Research details"
        >
          {activeRecord && (
            <ResearchDetails
              record={activeRecord}
              onClose={() => setActiveRecord(null)}
            />
          )}
        </SlideOver>
      </Sheet>
    </DashboardLayout>
  );
};

export default History;
