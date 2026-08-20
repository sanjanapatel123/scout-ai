// Static sample data for the initial visual design.
// Isolated on purpose — replace with real API responses via services/research.service.ts.
// The shape matches the backend contract exactly.

export type ResearchStatus = "pending" | "processing" | "completed" | "failed";

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface ResearchRecord {
  id: string;
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  description: string | null;
  aiSummary: string | null;
  services: string[];
  email: string | null;
  phone: string | null;
  socialLinks: SocialLinks;
  status: ResearchStatus;
  createdAt: string;
  updatedAt: string;
}

const now = Date.now();
const min = 60 * 1000;

export const SAMPLE_RESEARCH: ResearchRecord[] = [
  {
    id: "r_01hxvz7j2k",
    websiteUrl: "https://linear.app",
    companyName: "Linear",
    industry: "Developer Tools",
    location: "San Francisco, CA",
    description:
      "Linear is a modern software project and issue tracking tool built for high-performance product teams. It streamlines sprint planning, cycles, and roadmaps.",
    aiSummary:
      "Linear is a premium issue tracking and project management platform positioned against Jira, targeting engineering teams that value speed, keyboard-first workflows and craftsmanship. Their differentiators are performance, opinionated design and integrations with GitHub / Slack / Figma.",
    services: [
      "Issue Tracking",
      "Sprint Planning",
      "Roadmaps",
      "Cycles",
      "GitHub Sync",
    ],
    email: "hello@linear.app",
    phone: null,
    socialLinks: {
      twitter: "https://twitter.com/linear",
      linkedin: "https://linkedin.com/company/linear",
    },
    status: "completed",
    createdAt: new Date(now - 42 * min).toISOString(),
    updatedAt: new Date(now - 40 * min).toISOString(),
  },
  {
    id: "r_01hxvz9m4p",
    websiteUrl: "https://vercel.com",
    companyName: "Vercel",
    industry: "Cloud Infrastructure",
    location: "San Francisco, CA",
    description:
      "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    aiSummary:
      "Vercel is a frontend cloud infrastructure company centered around Next.js. It monetises via edge hosting, serverless compute and enterprise plans. Its ideal customers are frontend-heavy product companies shipping React / Next.js applications at scale.",
    services: [
      "Edge Network",
      "Serverless Functions",
      "Preview Deployments",
      "Analytics",
      "Next.js Hosting",
    ],
    email: "sales@vercel.com",
    phone: "+1 (559) 288-7060",
    socialLinks: {
      twitter: "https://twitter.com/vercel",
      github: "https://github.com/vercel",
    },
    status: "completed",
    createdAt: new Date(now - 3 * 60 * min).toISOString(),
    updatedAt: new Date(now - 3 * 60 * min + 90 * 1000).toISOString(),
  },
  {
    id: "r_01hxvzab7c",
    websiteUrl: "https://raycast.com",
    companyName: "Raycast",
    industry: "Productivity Software",
    location: "London, UK",
    description:
      "Raycast is a blazingly fast, totally extendable launcher. It lets you complete tasks, calculate, share common links, and much more.",
    aiSummary: null,
    services: [],
    email: null,
    phone: null,
    socialLinks: {},
    status: "processing",
    createdAt: new Date(now - 40 * 1000).toISOString(),
    updatedAt: new Date(now - 40 * 1000).toISOString(),
  },
  {
    id: "r_01hxvzcde9",
    websiteUrl: "https://supabase.com",
    companyName: "Supabase",
    industry: "Backend as a Service",
    location: "Remote",
    description:
      "Supabase is an open source Firebase alternative — a Postgres database with authentication, storage and edge functions built in.",
    aiSummary:
      "Supabase provides an open-source backend platform with hosted Postgres, auth, storage and edge functions. Positioned as the open Firebase alternative, its buyers are engineering teams that want a portable, SQL-native backend.",
    services: [
      "Postgres Database",
      "Auth",
      "Storage",
      "Edge Functions",
      "Realtime",
    ],
    email: "hello@supabase.io",
    phone: null,
    socialLinks: {
      twitter: "https://twitter.com/supabase",
      github: "https://github.com/supabase",
    },
    status: "completed",
    createdAt: new Date(now - 24 * 60 * min).toISOString(),
    updatedAt: new Date(now - 24 * 60 * min + 2 * min).toISOString(),
  },
  {
    id: "r_01hxvzefg2",
    websiteUrl: "https://openai.com",
    companyName: "OpenAI",
    industry: "Artificial Intelligence",
    location: "San Francisco, CA",
    description: null,
    aiSummary: null,
    services: [],
    email: null,
    phone: null,
    socialLinks: {},
    status: "failed",
    createdAt: new Date(now - 6 * 60 * min).toISOString(),
    updatedAt: new Date(now - 6 * 60 * min + 30 * 1000).toISOString(),
  },
  {
    id: "r_01hxvzhij4",
    websiteUrl: "https://stripe.com",
    companyName: "Stripe",
    industry: "Payments Infrastructure",
    location: "San Francisco, CA",
    description:
      "Stripe is a technology company that builds economic infrastructure for the internet.",
    aiSummary:
      "Stripe operates payment infrastructure for internet businesses. Revenue comes from transaction fees across payments, subscriptions (Billing), marketplaces (Connect) and identity products.",
    services: [
      "Payments",
      "Billing",
      "Connect",
      "Radar",
      "Terminal",
      "Issuing",
    ],
    email: "support@stripe.com",
    phone: "+1 888 926 2289",
    socialLinks: {
      twitter: "https://twitter.com/stripe",
      linkedin: "https://linkedin.com/company/stripe",
    },
    status: "completed",
    createdAt: new Date(now - 5 * 24 * 60 * min).toISOString(),
    updatedAt: new Date(now - 5 * 24 * 60 * min + 4 * min).toISOString(),
  },
];
