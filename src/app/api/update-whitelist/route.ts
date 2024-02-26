import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const collection = db.collection("mmosh-app-whitelist");

  const data = await req.json();

  const optionResult = await collection.findOne({
    wallet: data.wallet,
  });

  if (optionResult) {
    await collection.updateOne(
        {
           wallet: data.wallet,
        },
        {
          $set: {
            is_available: data.is_available,
          },
        },
      );
    return NextResponse.json("", {
      status: 200,
    });
  }

  await collection.insertOne({
    wallet: data.wallet,
    is_available: data.is_available,
  });

  return NextResponse.json("", { status: 200 });
}
