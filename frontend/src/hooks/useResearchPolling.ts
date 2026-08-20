import { useEffect, useRef } from "react";
import { getResearchById } from "@/services/research.service";

type ResearchStatus = "pending" | "processing" | "completed" | "failed";

interface ResearchRecord {
  id: string;
  status: ResearchStatus;
  [key: string]: unknown;
}

interface ResearchResponse {
  success?: boolean;
  data?: ResearchRecord;
}

type OnUpdate = (record: ResearchRecord) => void;

const ACTIVE_STATUSES = new Set<ResearchStatus>(["pending", "processing"]);

export function useResearchPolling(
  records: ResearchRecord[],
  onUpdate: OnUpdate,
  intervalMs = 2000,
) {
  const recordsRef = useRef(records);
  const onUpdateRef = useRef(onUpdate);
  const timersRef = useRef(new Map<string, ReturnType<typeof setInterval>>());

  // Always keep latest records available to timers
  useEffect(() => {
    recordsRef.current = records;
  }, [records]);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    const timers = timersRef.current;

    const activeIds = new Set(
      records
        .filter((record) => record.id && ACTIVE_STATUSES.has(record.status))
        .map((record) => record.id),
    );

    // --------------------------------
    // Stop polling inactive records
    // --------------------------------

    for (const [id, timer] of timers.entries()) {
      if (!activeIds.has(id)) {
        clearInterval(timer);
        timers.delete(id);
      }
    }

    // --------------------------------
    // Start polling new active records
    // --------------------------------

    for (const id of activeIds) {
      if (timers.has(id)) {
        continue;
      }

      const timer = setInterval(async () => {
        try {
          // Check latest state before making request
          const currentRecord = recordsRef.current.find(
            (record) => record.id === id,
          );

          if (!currentRecord || !ACTIVE_STATUSES.has(currentRecord.status)) {
            clearInterval(timer);
            timers.delete(id);
            return;
          }

          const res = (await getResearchById(id)) as ResearchResponse;

          if (!res?.success || !res.data) {
            return;
          }

          const updatedRecord = res.data;

          // Update React state
          onUpdateRef.current(updatedRecord);

          // --------------------------------
          // STOP polling immediately
          // --------------------------------

          if (
            updatedRecord.status === "completed" ||
            updatedRecord.status === "failed"
          ) {
            clearInterval(timer);
            timers.delete(id);
          }
        } catch (error) {
          console.warn(`Polling failed for research ${id}:`, error);
        }
      }, intervalMs);

      timers.set(id, timer);
    }

    return () => {
      // Don't destroy timers here.
      // They are managed by activeIds.
    };
  }, [records, intervalMs]);

  // --------------------------------
  // Complete cleanup
  // --------------------------------

  useEffect(() => {
    return () => {
      for (const timer of timersRef.current.values()) {
        clearInterval(timer);
      }

      timersRef.current.clear();
    };
  }, []);
}
