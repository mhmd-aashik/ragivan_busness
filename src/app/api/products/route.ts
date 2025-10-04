import { NextResponse } from "next/server";
import generatedProducts from "@/data/generated-products.json";

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json(generatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
