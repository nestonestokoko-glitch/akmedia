// ------------------------------------------------------------
// AK Media India — Typed API models
// These mirror the actual response shapes served by the route
// handlers in app/api/ (verified 1:1 against the route code).
// Nothing here is fabricated — the shapes describe real data.
// ------------------------------------------------------------

// ---------- Envelope ----------
export type ApiSuccess<T> = {
  success: true;
  data: T;
  count?: number;
};

export type ApiError = {
  success: false;
  message: string;
};

export type ApiResult<T> = ApiSuccess<T> | ApiError;

// ---------- Health ----------
export type HealthResponse = {
  status: "healthy";
  timestamp: string;
};

// ---------- Statistics ----------
// GET /api/stats → { success, data: Stats }
export type Stats = {
  totalCreators: number;
  totalBrands: number;
  creatorsApplied: number;
  brandQuotes: number;
  creatorVerificationRate: string;
  averageCampaignROI: string;
  activeCampaigns: number;
};

// ---------- Creators ----------
// GET /api/creators?limit=&category= → { success, count, data: Creator[] }
export type CreatorMetric = { label: string; value: string };

export type Creator = {
  id: string;
  name: string;
  initials: string;
  category: string;
  metrics: CreatorMetric[];
  hue: string; // tailwind gradient stops, e.g. "from-blue/80 to-transparent"
};

// ---------- Brands ----------
// GET /api/brands?limit= → { success, count, data: Brand[] }
// Note: brandMarks is the published "worked-with" wordmarks. The site
// holds no real per-brand category field, so this endpoint serves only
// what actually exists — no invented categories (see skill.md #24).
export type Brand = {
  id: string;
  name: string;
};

// ---------- Campaigns ----------
// GET /api/campaigns?limit= → { success, count, data: Campaign[] }
export type Campaign = {
  id: string;
  brand: string;
  creator: string;
  type: string;
  headline: string;
  result: string;
  resultLabel: string;
  gradient: string; // tailwind gradient stops for the section wash
};

// ---------- POST /api/brands/quote ----------
export type BrandQuoteInput = {
  name: string;
  email: string;
  phone?: string;
  brand: string;
  goals: string;
  budget?: string;
  campaignType?: string;
};

export type BrandQuoteData = {
  id: string;
  name: string;
  brand: string;
  createdAt: string;
};

export type BrandQuoteResponse = { success: true; message: string; data: BrandQuoteData };

// ---------- POST /api/creators/apply ----------
export type CreatorApplicationInput = {
  name: string;
  email: string;
  platform: string;
  followers: number;
  category?: string;
  interests?: string;
};

export type CreatorApplicationData = {
  id: string;
  name: string;
  platform: string;
  createdAt: string;
};

export type CreatorApplicationResponse = {
  success: true;
  message: string;
  data: CreatorApplicationData;
};

// ---------- POST error shape (shared) ----------
export type PostErrorResponse = { success: false; message: string };