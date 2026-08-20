import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResearchDetails } from "@/components/research/ResearchDetails";
import { getResearchById } from "@/services/research.service";
import { useResearchPolling } from "@/hooks/useResearchPolling";

interface ResearchRecord {
  id: string;
  websiteUrl: string;
  companyName?: string | null;
  industry?: string | null;
  location?: string | null;
  description?: string | null;
  aiSummary?: string | null;
  services?: string[];
  email?: string | null;
  phone?: string | null;
  socialLinks?: Record<string, string>;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

interface ResearchResponse {
  success: boolean;
  data?: ResearchRecord;
  message?: string;
}

const ResearchDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [record, setRecord] = useState<ResearchRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    const loadResearch = async () => {
      setLoading(true);

      try {
        if (!id) {
          toast.error("Research ID is missing.");
          return;
        }

        const res = (await getResearchById(id)) as ResearchResponse;

        if (cancelled) return;

        if (res?.success && res.data) {
          setRecord(res.data);
        } else {
          toast.error(res?.message || "Research not found.");
        }
      } catch {
        if (!cancelled) {
          toast.error("Unable to load research.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadResearch();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useResearchPolling(
    record ? [record] : [],
    (updated: ResearchRecord) =>
      setRecord((prev) =>
        prev
          ? {
              ...prev,
              ...updated,
            }
          : prev,
      ),
    2000,
  );

  return (
    <DashboardLayout title="Research detail" subtitle="Full profile view">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-scout-text-secondary hover:text-scout-text mb-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
        Back
      </button>

      <div className="bg-white border border-scout-border rounded-lg overflow-hidden shadow-scout-sm min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-scout-text-secondary text-sm gap-2">
            <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
            Loading research...
          </div>
        ) : record ? (
          <ResearchDetails record={record} onClose={() => navigate(-1)} />
        ) : (
          <div className="p-12 text-center text-sm text-scout-text-secondary">
            Research not found.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResearchDetailsPage;
