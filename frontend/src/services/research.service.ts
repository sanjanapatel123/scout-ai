// import axios from "axios";
// import { SAMPLE_RESEARCH } from "@/data/sampleResearch";

// const SCOUT_API_BASE =
//   import.meta.env.VITE_SCOUT_API_URL || "http://localhost:5000";
// const USE_SAMPLE_FALLBACK = import.meta.env.VITE_USE_SAMPLE_DATA !== "false";

// const client = axios.create({
//   baseURL: `${SCOUT_API_BASE}/api`,
//   timeout: 8000,
//   headers: { "Content-Type": "application/json" },
// });

// // ---- In-memory sample store (only used when the real API is unreachable) ----
// let sampleStore = [...SAMPLE_RESEARCH];
// let sampleIdCounter = 100;

// const nowIso = () => new Date().toISOString();

// const isNetworkError = (err) =>
//   !err?.response || err?.code === "ECONNABORTED" || err?.code === "ERR_NETWORK";

// const inferCompanyName = (url) => {
//   try {
//     const host = new URL(url).hostname.replace(/^www\./, "");
//     const root = host.split(".")[0] || host;
//     return root.charAt(0).toUpperCase() + root.slice(1);
//   } catch {
//     return "Unknown Company";
//   }
// };

// const sampleCreate = (websiteUrl) => {
//   const id = `r_sample_${++sampleIdCounter}`;
//   const record = {
//     id,
//     websiteUrl,
//     companyName: inferCompanyName(websiteUrl),
//     industry: null,
//     location: null,
//     description: null,
//     aiSummary: null,
//     services: [],
//     email: null,
//     phone: null,
//     socialLinks: {},
//     status: "pending",
//     createdAt: nowIso(),
//     updatedAt: nowIso(),
//   };
//   sampleStore = [record, ...sampleStore];

//   // Simulate a lifecycle: pending -> processing -> completed
//   setTimeout(() => {
//     sampleStore = sampleStore.map((r) =>
//       r.id === id ? { ...r, status: "processing", updatedAt: nowIso() } : r,
//     );
//   }, 1200);
//   setTimeout(() => {
//     sampleStore = sampleStore.map((r) =>
//       r.id === id
//         ? {
//             ...r,
//             status: "completed",
//             industry: "Uncategorised",
//             description: `Automated research completed for ${r.companyName}. This is a simulated response used only when the ScoutAI backend at ${SCOUT_API_BASE} is unreachable.`,
//             aiSummary: `${r.companyName} appears to be an online business. This summary is a placeholder generated locally because the ScoutAI backend is not reachable from this preview. Connect your local backend to see real AI-generated intelligence.`,
//             services: ["Website", "Product", "Support"],
//             email: `hello@${new URL(websiteUrl).hostname.replace(/^www\./, "")}`,
//             location: "Unknown",
//             socialLinks: {},
//             updatedAt: nowIso(),
//           }
//         : r,
//     );
//   }, 6500);
//   return record;
// };

// const sampleWrap = (data) => ({ success: true, message: "ok", data });

// // ---- Public API ---------------------------------------------------------

// export const listResearch = async () => {
//   try {
//     const res = await client.get("/research");
//     return res.data;
//   } catch (err) {
//     if (USE_SAMPLE_FALLBACK && isNetworkError(err)) {
//       return sampleWrap(sampleStore);
//     }
//     throw err;
//   }
// };

// export const getResearchById = async (id) => {
//   try {
//     const res = await client.get(`/research/${id}`);
//     return res.data;
//   } catch (err) {
//     if (USE_SAMPLE_FALLBACK && isNetworkError(err)) {
//       const found = sampleStore.find((r) => r.id === id);
//       if (!found) {
//         return {
//           success: false,
//           message: "Research not found.",
//           data: null,
//         };
//       }
//       return sampleWrap(found);
//     }
//     throw err;
//   }
// };

// export const createResearch = async (websiteUrl) => {
//   try {
//     const res = await client.post("/research", { websiteUrl });
//     return res.data;
//   } catch (err) {
//     if (USE_SAMPLE_FALLBACK && isNetworkError(err)) {
//       const record = sampleCreate(websiteUrl);
//       return sampleWrap({ id: record.id, status: record.status });
//     }
//     throw err;
//   }
// };

// export const deleteResearch = async (id) => {
//   try {
//     const res = await client.delete(`/research/${id}`);
//     return res.data;
//   } catch (err) {
//     if (USE_SAMPLE_FALLBACK && isNetworkError(err)) {
//       sampleStore = sampleStore.filter((r) => r.id !== id);
//       return sampleWrap({ id });
//     }
//     throw err;
//   }
// };

// export const isUsingSampleFallback = () => USE_SAMPLE_FALLBACK;
// export const getApiBase = () => SCOUT_API_BASE;

import axios from "axios";

const SCOUT_API_BASE =
  import.meta.env.VITE_SCOUT_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: `${SCOUT_API_BASE}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const normalizeResearch = (record: any) => {
  if (!record) return record;

  return {
    ...record,
    id: record.id || record._id?.toString(),
    websiteUrl: record.websiteUrl || record.url,
  };
};

export const listResearch = async () => {
  const res = await client.get("/research");

  if (res.data?.data && Array.isArray(res.data.data)) {
    res.data.data = res.data.data.map(normalizeResearch);
  }

  return res.data;
};

export const getResearchById = async (id: string) => {
  const res = await client.get(`/research/${id}`);

  if (res.data?.data && !Array.isArray(res.data.data)) {
    res.data.data = normalizeResearch(res.data.data);
  }

  return res.data;
};

export const createResearch = async (websiteUrl: string) => {
  const res = await client.post("/research", {
    url: websiteUrl,
  });

  if (res.data?.data) {
    res.data.data = normalizeResearch(res.data.data);
  }

  return res.data;
};

export const deleteResearch = async (id: string) => {
  const res = await client.delete(`/research/${id}`);
  return res.data;
};

export const isUsingSampleFallback = () => false;

export const getApiBase = () => SCOUT_API_BASE;
