import { NextResponse } from "next/server";
import { brandMarks } from "@/lib/data";

export const dynamic = "force-dynamic";

// GET /api/brands?limit=
// Serves the published "worked-with" wordmarks (real data, lib/data.ts).
// The site holds no further per-brand fields, so none are invented.
export function GET(request: Request) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? brandMarks.length);

  const data = brandMarks.slice(0, limit).map((name, i) => ({ id: String(i + 1), name }));

  return NextResponse.json({
    success: true,
    count: data.length,
    data,
  });
}