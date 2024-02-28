import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");
  const historyCollection = db.collection("mmosh-app-royalty");

  const { amount, receiver, sender } = await req.json();

  const user = await collection.findOne({
    wallet: receiver,
  });

  historyCollection.insertOne({
    sender: sender,
    receiver: receiver,
    amount: amount,
    created_date: new Date(),
    updated_date: new Date()
  })

  if (user) {
    let finalRoyalty = user.royalty ? user.royalty + amount : amount;
    await collection.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          royalty: finalRoyalty,
        },
      },
    );
    return NextResponse.json("", { status: 200 });
  } else {
      await collection.insertOne({
        wallet: receiver,
        royalty: amount
      });
      return NextResponse.json("", { status: 200 });
  }

}
