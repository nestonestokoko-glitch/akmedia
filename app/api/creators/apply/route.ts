import { NextResponse } from "next/server";
import { addCreatorApplication, type CreatorApplication } from "@/lib/store";

export const dynamic = "force-dynamic";

const SUCCESS_MESSAGE =
  "Thank you for your application! We will review your profile and contact you within 5 business days.";

function parseFollowers(value: unknown): number {
  const n = parseInt(String(value).replace(/[^\d]/g, ""), 10);
  return Number.isNaN(n) ? 0 : n;
}

// POST /api/creators/apply
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { name, email, platform, followers, category, interests } = body;

  // Validation — mirrors the original Express endpoint
  if (!name || !email || !platform || !followers) {
    return NextResponse.json(
      { success: false, message: "Required fields are missing" },
      { status: 400 }
    );
  }

  const application: CreatorApplication = {
    id: Date.now().toString(),
    name: String(name),
    email: String(email),
    platform: String(platform),
    followers: parseFollowers(followers),
    category: category ? String(category) : "General",
    interests: Array.isArray(interests) ? interests.map(String) : [],
    createdAt: new Date().toISOString(),
    status: "pending_review",
    verificationRequired: true,
  };

  addCreatorApplication(application);

  return NextResponse.json({
    success: true,
    message: SUCCESS_MESSAGE,
    data: {
      id: application.id,
      name: application.name,
      platform: application.platform,
      createdAt: application.createdAt,
    },
  });
}