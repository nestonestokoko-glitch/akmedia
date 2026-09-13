import { NextResponse } from "next/server";
import { campaigns } from "@/lib/data";

export const dynamic = "force-dynamic";

// GET /api/campaigns
export function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? 10);

  const data = campaigns.slice(0, limit);

  return NextResponse.json({
    success: true,
    count: data.length,
    data,
  });
}