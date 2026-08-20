import React, { ReactNode } from "react";
import {
  X,
  Sparkles,
  Building2,
  Globe,
  Factory,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Loader2,
  MessageCircle,
  BriefcaseBusiness,
  Code2,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  formatAbsolute,
  stripProtocol,
  initialsFromName,
  avatarColorFor,
} from "@/lib/format";
import { DETAIL } from "@/constants/testIds";

type ResearchStatus = "pending" | "processing" | "completed" | "failed";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  [key: string]: string | undefined;
}

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
  socialLinks?: SocialLinks;
  status: ResearchStatus;
  createdAt: string;
  updatedAt: string;
}

interface ResearchDetailsProps {
  record: ResearchRecord | null;
  onClose: () => void;
}

interface SectionProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

const Section = ({ title, children, action }: SectionProps) => (
  <section className="mb-7">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-[11px] font-semibold text-scout-text-secondary uppercase tracking-wider">
        {title}
      </h3>

      {action}
    </div>

    {children}
  </section>
);

interface InfoRowProps {
  Icon: React.ElementType;
  label: string;
  value?: string | null;
  href?: string;
}

const InfoRow = ({ Icon, label, value, href }: InfoRowProps) => {
  if (!value) return null;

  const body = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-scout-text hover:text-scout-primary transition-colors inline-flex items-center gap-1.5"
    >
      {value}
      <ExternalLink className="w-3 h-3 opacity-60" strokeWidth={2} />
    </a>
  ) : (
    <span className="text-sm text-scout-text">{value}</span>
  );

  return (
    <div className="flex items-start gap-3 py-2 border-b border-scout-border last:border-b-0">
      <Icon
        className="w-4 h-4 text-scout-text-secondary mt-0.5 flex-shrink-0"
        strokeWidth={2}
      />

      <div className="flex-1 min-w-0">
        <div className="text-xs text-scout-text-secondary mb-0.5">{label}</div>

        <div className="truncate">{body}</div>
      </div>
    </div>
  );
};

const SOCIAL_ICONS: Record<string, typeof MessageCircle> = {
  twitter: MessageCircle,
  linkedin: BriefcaseBusiness,
  github: Code2,
};

const ProcessingState = () => (
  <div className="rounded-lg border border-scout-border bg-scout-bg/60 p-5 flex items-center gap-3">
    <Loader2
      className="w-4 h-4 text-scout-primary animate-spin"
      strokeWidth={2.25}
    />

    <div>
      <div className="text-sm font-medium text-scout-text">
        Research in progress
      </div>

      <div className="text-xs text-scout-text-secondary">
        ScoutAI is analysing the site. This usually takes 20–60 seconds.
      </div>
    </div>
  </div>
);

interface FailedStateProps {
  record: ResearchRecord;
}

const FailedState = ({ record }: FailedStateProps) => (
  <div className="rounded-lg border border-scout-error/25 bg-scout-error/5 p-5">
    <div className="text-sm font-medium text-scout-error mb-1">
      Research failed
    </div>

    <div className="text-xs text-scout-text-secondary">
      We couldn't extract data from {stripProtocol(record.websiteUrl)}. Please
      try again with a different URL.
    </div>
  </div>
);

export const ResearchDetails = ({ record, onClose }: ResearchDetailsProps) => {
  if (!record) return null;

  const name =
    record.companyName || stripProtocol(record.websiteUrl) || "Untitled";

  const color = avatarColorFor(name);
  const initials = initialsFromName(name);
  const isDone = record.status === "completed";

  const socialEntries = Object.entries(record.socialLinks || {}).filter(
    ([, v]) => Boolean(v),
  );

  return (
    <aside
      data-testid={DETAIL.panel}
      className="h-full w-full flex flex-col bg-white border-l border-scout-border"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-scout-border">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            {initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-scout-text truncate">
              {name}
            </h2>

            <a
              href={record.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-scout-text-secondary hover:text-scout-primary transition-colors inline-flex items-center gap-1"
            >
              {stripProtocol(record.websiteUrl)}

              <ExternalLink className="w-3 h-3" strokeWidth={2} />
            </a>
          </div>
        </div>

        <button
          data-testid={DETAIL.close}
          onClick={onClose}
          aria-label="Close details"
          className="w-8 h-8 rounded-md flex items-center justify-center text-scout-text-secondary hover:text-scout-text hover:bg-scout-bg transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center gap-2">
          <StatusBadge status={record.status} />

          <span className="text-xs text-scout-text-secondary">
            Updated {formatAbsolute(record.updatedAt)}
          </span>
        </div>

        {record.status === "pending" || record.status === "processing" ? (
          <ProcessingState />
        ) : null}

        {record.status === "failed" && <FailedState record={record} />}

        {isDone && (
          <>
            <Section title="Company Overview">
              <div className="rounded-lg border border-scout-border bg-white">
                <div className="px-4">
                  <InfoRow
                    Icon={Building2}
                    label="Company"
                    value={record.companyName || "—"}
                  />

                  <InfoRow
                    Icon={Globe}
                    label="Website"
                    value={stripProtocol(record.websiteUrl)}
                    href={record.websiteUrl}
                  />

                  <InfoRow
                    Icon={Factory}
                    label="Industry"
                    value={record.industry || "—"}
                  />

                  <InfoRow
                    Icon={MapPin}
                    label="Location"
                    value={record.location || "—"}
                  />
                </div>
              </div>
            </Section>

            {record.aiSummary && (
              <Section title="AI Summary">
                <div
                  data-testid={DETAIL.aiSummary}
                  className="relative rounded-lg border border-scout-primary/20 bg-gradient-to-br from-scout-primary/5 to-transparent p-5"
                >
                  <Sparkles
                    className="w-4 h-4 text-scout-primary absolute top-4 right-4"
                    strokeWidth={2}
                    aria-hidden
                  />

                  <div className="text-[11px] font-semibold text-scout-primary uppercase tracking-wider mb-2">
                    Generated by ScoutAI
                  </div>

                  <p className="text-sm text-scout-text leading-relaxed pr-8">
                    {record.aiSummary}
                  </p>
                </div>
              </Section>
            )}

            {record.description && (
              <Section title="Description">
                <p className="text-sm text-scout-text leading-relaxed">
                  {record.description}
                </p>
              </Section>
            )}

            {record.services && record.services.length > 0 && (
              <Section title="Services">
                <div className="flex flex-wrap gap-2">
                  {record.services.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-scout-bg border border-scout-border text-xs font-medium text-scout-text"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {(record.email || record.phone || record.location) && (
              <Section title="Contact Information">
                <div className="rounded-lg border border-scout-border bg-white px-4">
                  <InfoRow
                    Icon={Mail}
                    label="Email"
                    value={record.email}
                    href={record.email ? `mailto:${record.email}` : undefined}
                  />

                  <InfoRow
                    Icon={Phone}
                    label="Phone"
                    value={record.phone}
                    href={record.phone ? `tel:${record.phone}` : undefined}
                  />

                  <InfoRow
                    Icon={MapPin}
                    label="Location"
                    value={record.location}
                  />
                </div>
              </Section>
            )}

            {socialEntries.length > 0 && (
              <Section title="Social Links">
                <div className="flex flex-wrap gap-2">
                  {socialEntries.map(([key, href]) => {
                    const Icon = SOCIAL_ICONS[key] || ExternalLink;

                    return (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-scout-border bg-white hover:bg-scout-bg text-xs font-medium text-scout-text transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" strokeWidth={2} />

                        <span className="capitalize">{key}</span>
                      </a>
                    );
                  })}
                </div>
              </Section>
            )}
          </>
        )}

        <Section title="Research Metadata">
          <div className="rounded-lg border border-scout-border bg-white px-4">
            <div className="flex items-center justify-between py-2.5 border-b border-scout-border">
              <span className="text-xs text-scout-text-secondary">ID</span>

              <span className="text-xs font-mono text-scout-text">
                {record.id}
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-scout-border">
              <span className="text-xs text-scout-text-secondary">Status</span>

              <StatusBadge status={record.status} />
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-scout-border">
              <span className="text-xs text-scout-text-secondary">Created</span>

              <span className="text-xs text-scout-text">
                {formatAbsolute(record.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-xs text-scout-text-secondary">Updated</span>

              <span className="text-xs text-scout-text">
                {formatAbsolute(record.updatedAt)}
              </span>
            </div>
          </div>
        </Section>
      </div>
    </aside>
  );
};
