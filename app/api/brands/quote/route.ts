import { NextResponse } from "next/server";
import { addBrandQuote, type BrandQuote } from "@/lib/store";

export const dynamic = "force-dynamic";

const SUCCESS_MESSAGE =
  "Thank you! We will contact you within 24 hours to discuss your campaign strategy.";

// POST /api/brands/quote
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

  const { name, email, phone, brand, goals, budget, campaignType } = body;

  // Validation — mirrors the original Express endpoint
  if (!name || !email || !brand || !goals) {
    return NextResponse.json(
      { success: false, message: "Required fields are missing" },
      { status: 400 }
    );
  }

  const quote: BrandQuote = {
    id: Date.now().toString(),
    name: String(name),
    email: String(email),
    phone: phone ? String(phone) : "N/A",
    brand: String(brand),
    goals: String(goals),
    budget: budget ? String(budget) : "Not specified",
    campaignType: campaignType ? String(campaignType) : "Influencer marketing",
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  addBrandQuote(quote);

  return NextResponse.json({
    success: true,
    message: SUCCESS_MESSAGE,
    data: {
      id: quote.id,
      name: quote.name,
      brand: quote.brand,
      createdAt: quote.createdAt,
    },
  });
}