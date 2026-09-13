// ------------------------------------------------------------
// Server-side in-memory store
// Mirrors the original Express data store so the Next.js API
// routes are drop-in compatible with the same response shapes.
// ------------------------------------------------------------

export type BrandQuote = {
  id: string;
  name: string;
  email: string;
  phone: string;
  brand: string;
  goals: string;
  budget: string;
  campaignType: string;
  createdAt: string;
  status: "pending";
};

export type CreatorApplication = {
  id: string;
  name: string;
  email: string;
  platform: string;
  followers: number;
  category: string;
  interests: string[];
  createdAt: string;
  status: "pending_review";
  verificationRequired: true;
};

const store = {
  brandQuotes: [] as BrandQuote[],
  creatorApplications: [] as CreatorApplication[],
};

export function addBrandQuote(quote: BrandQuote) {
  store.brandQuotes.push(quote);
  return quote;
}

export function addCreatorApplication(app: CreatorApplication) {
  store.creatorApplications.push(app);
  return app;
}

export function getStats() {
  return {
    totalCreators: store.creatorApplications.length,
    totalBrands: store.brandQuotes.length,
    creatorsApplied: store.creatorApplications.length,
    brandQuotes: store.brandQuotes.length,
    creatorVerificationRate: "85%", // existing published claim
    averageCampaignROI: "3.2x",     // existing published claim
  };
}

export type { CreatorApplication as CreatorApplicationModel };