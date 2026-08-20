import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SlideOver } from "@/components/layout/SlideOver";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResearchHero } from "@/components/dashboard/ResearchHero";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ResearchTable } from "@/components/dashboard/ResearchTable";
import { ResearchDetails } from "@/components/research/ResearchDetails";
import { useResearchPolling } from "@/hooks/useResearchPolling";

import {
  listResearch,
  createResearch,
  deleteResearch,
  getResearchById,
  isUsingSampleFallback,
  getApiBase,
} from "@/services/research.service";

import { isValidUrl } from "@/lib/format";

type ResearchStatus = "pending" | "processing" | "completed" | "failed";

interface ResearchRecord {
  id: string;
  websiteUrl: string;
  companyName: string | null;
  industry: string | null;
  location: string | null;
  description: string | null;
  aiSummary: string | null;
  services: string[];
  email: string | null;
  phone: string | null;
  socialLinks: Record<string, string>;
  status: ResearchStatus;
  createdAt: string;
  updatedAt: string;
}

interface ResearchResponse {
  success: boolean;
  data?: ResearchRecord | ResearchRecord[];
  message?: string;
}

const Dashboard = () => {
  const [records, setRecords] = useState<ResearchRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeRecord, setActiveRecord] = useState<ResearchRecord | null>(null);
  const [warnedFallback, setWarnedFallback] = useState<boolean>(false);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const res = (await listResearch()) as ResearchResponse;

      if (res?.success) {
        const data = Array.isArray(res.data) ? res.data : [];

        setRecords(data);

        if (
          isUsingSampleFallback() &&
          !warnedFallback &&
          Array.isArray(res.data)
        ) {
          toast.message("Preview mode", {
            description: `Live backend at ${getApiBase()} not reachable — showing sample intelligence.`,
          });

          setWarnedFallback(true);
        }
      } else {
        setRecords([]);

        toast.error(res?.message || "Unable to load research.");
      }
    } catch (err) {
      toast.error("Unable to load research.");

      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleUpdateRecord = useCallback((updated: ResearchRecord) => {
    setRecords((prev) => {
      const idx = prev.findIndex((r) => r.id === updated.id);

      if (idx === -1) return prev;

      const next = [...prev];

      next[idx] = {
        ...next[idx],
        ...updated,
      };

      return next;
    });

    setActiveRecord((prev) =>
      prev && prev.id === updated.id
        ? {
            ...prev,
            ...updated,
          }
        : prev,
    );
  }, []);

  useResearchPolling(records, handleUpdateRecord, 2000);

  const handleCreate = useCallback(async (websiteUrl: string) => {
    if (!isValidUrl(websiteUrl)) {
      toast.error("Please enter a valid website URL.");
      return;
    }

    setSubmitting(true);

    try {
      const res = (await createResearch(websiteUrl)) as ResearchResponse;

      if (
        !res?.success ||
        !res.data ||
        Array.isArray(res.data) ||
        !res.data.id
      ) {
        toast.error(res?.message || "Unable to start research.");
        return;
      }

      const now = new Date().toISOString();

      const optimistic: ResearchRecord = {
        id: res.data.id,
        websiteUrl,
        companyName: null,
        industry: null,
        location: null,
        description: null,
        aiSummary: null,
        services: [],
        email: null,
        phone: null,
        socialLinks: {},
        status: res.data.status || "pending",
        createdAt: now,
        updatedAt: now,
      };

      setRecords((prev) => [optimistic, ...prev]);

      toast.success("Research started", {
        description: "You'll see results appear as they come in.",
      });
    } catch (err) {
      toast.error("Unable to start research.");

      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }, []);

  const handleView = useCallback(
    async (record: ResearchRecord) => {
      if (!record?.id) {
        console.error("Missing research ID:", record);
        return;
      }

      setActiveRecord(record);

      try {
        const res = (await getResearchById(record.id)) as ResearchResponse;

        console.log("Research details:", res);

        if (res?.success && res.data && !Array.isArray(res.data)) {
          setActiveRecord(res.data);
          handleUpdateRecord(res.data);
        }
      } catch (error) {
        console.error("Failed to load research:", error);
      }
    },
    [handleUpdateRecord],
  );

  const handleDelete = useCallback(
    async (record: ResearchRecord) => {
      const prev = records;

      setRecords((cur) => cur.filter((r) => r.id !== record.id));

      setActiveRecord((cur) => (cur?.id === record.id ? null : cur));

      try {
        const res = await deleteResearch(record.id);

        if (!res?.success) {
          setRecords(prev);

          toast.error(res?.message || "Unable to delete research.");

          return;
        }

        toast.success("Research deleted");
      } catch (err) {
        setRecords(prev);

        toast.error("Unable to delete research.");

        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
    [records],
  );

  const recentRecords = useMemo(
    () =>
      [...records].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [records],
  );

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Overview of your recent research activity"
    >
      <ResearchHero onSubmit={handleCreate} submitting={submitting} />

      <StatsCards records={records} />

      <ResearchTable
        records={recentRecords}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
        title="Recent Research"
        subtitle="Automatically updates as jobs complete."
      />

      <Sheet
        open={Boolean(activeRecord)}
        onOpenChange={(open) => !open && setActiveRecord(null)}
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

export default Dashboard;
