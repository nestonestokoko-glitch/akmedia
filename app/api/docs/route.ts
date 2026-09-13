import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/docs
// Endpoint manifest + data models for the AK Media India API.
// Serves the same information a client needs to integrate.
export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

  return NextResponse.json({
    success: true,
    data: {
      service: "AK Media India API",
      baseUrl,
      endpoints: [
        { method: "GET", path: "/health", description: "Service health check" },
        { method: "GET", path: "/stats", description: "Live platform statistics (creators, brands, applied, quotes, verification rate, avg ROI)" },
        { method: "GET", path: "/creators", description: "Verified creator roster. Query: ?limit=&category=" },
        { method: "GET", path: "/brands", description: "Published brand wordmarks (worked-with marks). Query: ?limit=" },
        { method: "GET", path: "/campaigns", description: "Campaign showcase. Query: ?limit=" },
        { method: "POST", path: "/brands/quote", description: "Submit a brand quote request. Body: { name, email, phone?, brand, goals, budget?, campaignType? }" },
        { method: "POST", path: "/creators/apply", description: "Submit a creator application. Body: { name, email, platform, followers, category?, interests? }" },
      ],
      models: {
        Statistics: {
          totalCreators: "number",
          totalBrands: "number",
          creatorsApplied: "number",
          brandQuotes: "number",
          creatorVerificationRate: "string",
          averageCampaignROI: "string",
          activeCampaigns: "number",
        },
        Creator: { id: "string", name: "string", initials: "string", category: "string", metrics: "array<{ label, value }>", hue: "string" },
        Brand: { id: "string", name: "string" },
        Campaign: {
          id: "string",
          brand: "string",
          creator: "string",
          type: "string",
          headline: "string",
          result: "string",
          resultLabel: "string",
          gradient: "string",
        },
        BrandQuote: { name: "string", email: "string", phone: "string?", brand: "string", goals: "string", budget: "string?", campaignType: "string?" },
        CreatorApplication: { name: "string", email: "string", platform: "string", followers: "number", category: "string?", interests: "string?" },
      },
      envelope: {
        success: "boolean",
        data: "T",
        count: "number?",
        message: "string (on error or submit)",
      },
    },
  });
}