import { Eye, Trash2, MoreHorizontal, ExternalLink } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  formatRelativeTime,
  stripProtocol,
  initialsFromName,
  avatarColorFor,
} from "@/lib/format";

import { TABLE } from "@/constants/testIds";

export interface ResearchRecord {
  id: string;
  companyName?: string;
  websiteUrl: string;
  industry?: string;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
}

interface ResearchRowProps {
  record: ResearchRecord;
  onView: (record: ResearchRecord) => void;
  onDelete: (record: ResearchRecord) => void;
}

interface CompanyCellProps {
  record: ResearchRecord;
}

const CompanyCell = ({ record }: CompanyCellProps) => {
  const displayName =
    record.companyName || stripProtocol(record.websiteUrl) || "Untitled";

  const color = avatarColorFor(displayName);
  const initials = initialsFromName(displayName);
  const site = stripProtocol(record.websiteUrl);

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      >
        {initials}
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-scout-text">
          {displayName}
        </div>

        <div className="truncate text-xs text-scout-text-secondary">
          {site || "—"}
        </div>
      </div>
    </div>
  );
};

export const ResearchRow = ({ record, onView, onDelete }: ResearchRowProps) => {
  return (
    <tr
      data-testid={TABLE.row(record.id)}
      className="border-b border-scout-border transition-colors duration-150 hover:bg-scout-bg/60"
    >
      {/* Company */}
      <td className="max-w-[280px] px-6 py-3.5">
        <CompanyCell record={record} />
      </td>

      {/* Website */}
      <td className="hidden px-6 py-3.5 text-sm text-scout-text-secondary xl:table-cell">
        <a
          href={record.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-scout-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scout-primary focus-visible:ring-offset-2"
        >
          {stripProtocol(record.websiteUrl) || "—"}

          <ExternalLink
            className="h-3 w-3 opacity-60"
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      </td>

      {/* Industry */}
      <td className="hidden px-6 py-3.5 text-sm text-scout-text md:table-cell">
        {record.industry || (
          <span className="text-scout-text-secondary">—</span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-3.5">
        <StatusBadge status={record.status} />
      </td>

      {/* Created */}
      <td className="hidden whitespace-nowrap px-6 py-3.5 text-sm text-scout-text-secondary sm:table-cell">
        {formatRelativeTime(record.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-6 py-3.5 text-right">
        <div className="flex items-center justify-end gap-1">
          {/* View */}
          <button
            type="button"
            onClick={() => onView(record)}
            data-testid={TABLE.viewButton(record.id)}
            aria-label={`View research for ${
              record.companyName || record.websiteUrl
            }`}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-scout-text-secondary transition-colors hover:bg-scout-bg hover:text-scout-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scout-primary focus-visible:ring-offset-2"
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />

            <span className="hidden sm:inline">View</span>
          </button>

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                data-testid={TABLE.actionsMenu(record.id)}
                aria-label={`Actions for ${
                  record.companyName || record.websiteUrl
                }`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-scout-text-secondary transition-colors hover:bg-scout-bg hover:text-scout-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scout-primary focus-visible:ring-offset-2"
              >
                <MoreHorizontal
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40 border-scout-border bg-white shadow"
            >
              <DropdownMenuItem
                onClick={() => onView(record)}
                className="cursor-pointer text-scout-text focus:bg-scout-bg"
              >
                <Eye
                  className="mr-2 h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                View
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-scout-border" />

              <DropdownMenuItem
                onClick={() => onDelete(record)}
                data-testid={TABLE.deleteButton(record.id)}
                className="cursor-pointer text-scout-error focus:bg-scout-error/5 focus:text-scout-error"
              >
                <Trash2
                  className="mr-2 h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};
