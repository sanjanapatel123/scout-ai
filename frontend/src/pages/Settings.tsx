import React from "react";
import { Server, Info, KeyRound } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getApiBase, isUsingSampleFallback } from "@/services/research.service";

interface RowProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

const Row = ({ label, value, mono = false }: RowProps) => (
  <div className="flex items-center justify-between py-3 border-b border-scout-border last:border-b-0">
    <span className="text-sm text-scout-text-secondary">{label}</span>

    <span
      className={`text-sm text-scout-text ${mono ? "font-mono text-xs" : ""}`}
    >
      {value}
    </span>
  </div>
);

const Settings = () => {
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Workspace preferences and connection details"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-scout-border rounded-lg shadow-scout-sm">
            <div className="px-5 py-4 border-b border-scout-border flex items-center gap-2">
              <Server className="w-4 h-4 text-scout-primary" strokeWidth={2} />

              <h2 className="text-sm font-semibold text-scout-text">
                Backend connection
              </h2>
            </div>

            <div className="px-5">
              <Row label="API base URL" value={getApiBase()} mono />

              <Row
                label="Status"
                value={
                  isUsingSampleFallback() ? "Preview (sample data)" : "Live"
                }
              />

              <Row label="Endpoints" value="/api/research" mono />
            </div>
          </div>

          <div className="bg-white border border-scout-border rounded-lg shadow-scout-sm">
            <div className="px-5 py-4 border-b border-scout-border flex items-center gap-2">
              <KeyRound
                className="w-4 h-4 text-scout-primary"
                strokeWidth={2}
              />

              <h2 className="text-sm font-semibold text-scout-text">
                Workspace
              </h2>
            </div>

            <div className="px-5">
              <Row label="Plan" value="Pro" />

              <Row label="Seats" value="1 / 5" />

              <Row label="Concurrency" value="4 parallel jobs" />
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-white border border-scout-border rounded-lg p-5 shadow-scout-sm">
            <div className="flex items-start gap-3">
              <Info
                className="w-4 h-4 text-scout-primary mt-0.5 flex-shrink-0"
                strokeWidth={2}
              />

              <div>
                <h3 className="text-sm font-semibold text-scout-text mb-1">
                  Connect your backend
                </h3>

                <p className="text-xs text-scout-text-secondary leading-relaxed">
                  ScoutAI expects a REST backend at
                  <span className="font-mono text-scout-text">
                    {" "}
                    {getApiBase()}
                    /api/research
                  </span>
                  . You can override this via the
                  <span className="font-mono text-scout-text">
                    {" "}
                    REACT_APP_SCOUT_API_URL{" "}
                  </span>
                  environment variable.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
