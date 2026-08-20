export const formatRelativeTime = (iso: string | null | undefined): string => {
  if (!iso) return "—";

  const then = new Date(iso).getTime();

  if (Number.isNaN(then)) return "—";

  const diff = Date.now() - then;
  const s = Math.round(diff / 1000);

  if (s < 60) return `${s}s ago`;

  const m = Math.round(s / 60);

  if (m < 60) return `${m}m ago`;

  const h = Math.round(m / 60);

  if (h < 24) return `${h}h ago`;

  const d = Math.round(h / 24);

  if (d < 30) return `${d}d ago`;

  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatAbsolute = (iso: string | null | undefined): string => {
  if (!iso) return "—";

  const d = new Date(iso);

  if (Number.isNaN(d.getTime())) return "—";

  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const stripProtocol = (url: string | null | undefined): string => {
  if (!url) return "";

  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
};

export const initialsFromName = (name: string | null | undefined): string => {
  if (!name) return "?";

  return name
    .split(/\s|[.\-_]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

// Deterministic color for the company avatar background.
export const avatarColorFor = (seed: string | null | undefined): string => {
  const palette = [
    "#4F46E5",
    "#0EA5E9",
    "#059669",
    "#D97706",
    "#DB2777",
    "#7C3AED",
    "#0891B2",
    "#65A30D",
  ];

  if (!seed) return palette[0];

  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);

    hash |= 0;
  }

  return palette[Math.abs(hash) % palette.length];
};

export const isValidUrl = (value: string | null | undefined): boolean => {
  if (!value) return false;

  let candidate = value.trim();

  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const u = new URL(candidate);

    return Boolean(u.hostname && u.hostname.includes("."));
  } catch {
    return false;
  }
};

export const normaliseUrl = (value: string | null | undefined): string => {
  if (!value) return "";

  const trimmed = value.trim();

  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
};
