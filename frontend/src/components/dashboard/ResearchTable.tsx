import React, { ReactNode } from "react";
import { ResearchRow } from "@/components/dashboard/ResearchRow";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ResearchTableSkeleton } from "@/components/research/ResearchSkeleton";
import { TABLE } from "@/constants/testIds";

interface ResearchRecord {
  id: string;
  [key: string]: unknown;
}

interface HeaderCellProps {
  children: ReactNode;
  className?: string;
}

interface ResearchTableProps {
  records: ResearchRecord[];
  loading: boolean;
  onView: (record: ResearchRecord) => void;
  onDelete: (record: ResearchRecord) => void;
  title?: string;
  subtitle?: string;
}

const HeaderCell = ({ children, className = "" }: HeaderCellProps) => (
  <th
    scope="col"
    className={`px-6 py-3 text-left text-[11px] font-semibold text-scout-text-secondary uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

export const ResearchTable = ({
  records,
  loading,
  onView,
  onDelete,
  title = "Recent Research",
  subtitle,
}: ResearchTableProps) => {
  if (loading) return <ResearchTableSkeleton />;

  return (
    <section
      className="bg-white border border-scout-border rounded-lg overflow-hidden shadow-scout-sm"
      data-testid={TABLE.root}
    >
      <header className="flex items-baseline justify-between px-6 py-4 border-b border-scout-border">
        <div>
          <h2 className="text-sm font-semibold text-scout-text">{title}</h2>

          {subtitle && (
            <p className="text-xs text-scout-text-secondary mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <span className="text-xs text-scout-text-secondary tabular-nums">
          {records.length} {records.length === 1 ? "result" : "results"}
        </span>
      </header>

      {records.length === 0 ? (
        <div className="p-6">
          <EmptyState />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-scout-bg border-b border-scout-border">
              <tr>
                <HeaderCell>Company</HeaderCell>

                <HeaderCell className="hidden xl:table-cell">
                  Website
                </HeaderCell>

                <HeaderCell className="hidden md:table-cell">
                  Industry
                </HeaderCell>

                <HeaderCell>Status</HeaderCell>

                <HeaderCell className="hidden sm:table-cell">
                  Created
                </HeaderCell>

                <HeaderCell className="text-right">
                  <span className="sr-only">Actions</span>
                </HeaderCell>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <ResearchRow
                  key={record.id}
                  record={record}
                  onView={onView}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
