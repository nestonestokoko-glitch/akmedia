import { NextResponse } from "next/server";
import { creators } from "@/lib/data";

export const dynamic = "force-dynamic";

// GET /api/creators?limit=&category=
// Serves the real creator roster (lib/data.ts) — name, category and
// verified follower/earnings metrics. Everything here is published
// site data; nothing is fabricated.
export function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? creators.length);
  const category = url.searchParams.get("category");

  let data = creators;
  if (category) {
    data = data.filter((c) => c.category === category);
  }

  return NextResponse.json({
    success: true,
    count: data.length,
    data: data.slice(0, limit),
  });
}