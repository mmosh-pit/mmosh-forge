import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collection = db.collection("mmosh-app-tokens");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("symbol").toLowerCase();

  const token = await collection.findOne(
    {
      symbol: param,
    }
  );

  return NextResponse.json(!!token, {
    status: 200,
  });
}
