import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const collection = db.collection("mmosh-app-whitelist");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("wallet");

  const optionValue = await collection.findOne({
    wallet: param,
  });
  if(optionValue) {
    return NextResponse.json(optionValue.is_available, {
        status: 200,
    });
  } else {
    return NextResponse.json(false, {
        status: 200,
    });
  }
}
