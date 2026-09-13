import { NextResponse } from "next/server";
import { getStats } from "@/lib/store";

export const dynamic = "force-dynamic";

// GET /api/stats
export function GET() {
  const stats = getStats();

  return NextResponse.json({
    success: true,
    data: {
      ...stats,
      activeCampaigns: 0, // populated from the campaigns rail in production
    },
  });
}