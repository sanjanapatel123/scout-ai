export const HOME = {
  emergentLink: "emergent-link",
};

export const NAV = {
  sidebar: "sidebar",
  sidebarToggle: "sidebar-toggle",
  sidebarItem: (key: string) => `sidebar-item-${key}`,
  topbar: "topbar",
  topbarSearch: "topbar-search",
  topbarNotifications: "topbar-notifications-button",
  topbarAvatar: "topbar-avatar",
};

export const HERO = {
  urlInput: "hero-url-input",
  submit: "hero-submit-button",
};

export const STATS = {
  total: "stat-total",
  processing: "stat-processing",
  completed: "stat-completed",
  failed: "stat-failed",
};

export const TABLE = {
  root: "research-table",
  row: (id: string) => `research-row-${id}`,
  viewButton: (id: string) => `research-view-${id}`,
  deleteButton: (id: string) => `research-delete-${id}`,
  actionsMenu: (id: string) => `research-actions-${id}`,
  emptyState: "research-empty-state",
  skeleton: "research-table-skeleton",
};

export const DETAIL = {
  panel: "research-detail-panel",
  close: "research-detail-close",
  aiSummary: "research-ai-summary",
};
