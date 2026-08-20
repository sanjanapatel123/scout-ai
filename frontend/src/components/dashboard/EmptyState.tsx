import React from "react";
import { Radar } from "lucide-react";
import { TABLE } from "@/constants/testIds";

export const EmptyState = () => {
  return (
    <div
      data-testid={TABLE.emptyState}
      className="flex flex-col items-center justify-center px-6 py-16 text-center border border-dashed border-scout-border rounded-lg bg-white/60"
    >
      <div className="w-12 h-12 rounded-full bg-scout-bg border border-scout-border flex items-center justify-center mb-5">
        <Radar className="w-5 h-5 text-scout-primary" strokeWidth={1.75} />
      </div>

      <h3 className="text-base font-semibold text-scout-text mb-1">
        Start your first research
      </h3>

      <p className="text-sm text-scout-text-secondary max-w-md">
        Paste a website URL above and ScoutAI will extract company intelligence
        automatically.
      </p>
    </div>
  );
};
