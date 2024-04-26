import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");
  const historyCollection = db.collection("mmosh-app-royalty");
  const tokener = await getToken({ req, secret });
  if (!tokener || !tokener.sub){
    return NextResponse.json(null, {
      status: 200,
    });
  }
  const { sender, receivers, coin } = await req.json();

  for (let index = 0; index < receivers.length; index++) {
    const element = receivers[index];
    const receiver = element.receiver;
    const amount = element.amount;

    const user = await collection.findOne({
      wallet: receiver,
    });

    await historyCollection.insertOne({
      sender: sender,
      receiver: receiver,
      amount: amount,
      coin,
      created_date: new Date(),
      updated_date: new Date()
    })
  }
  return NextResponse.json("", { status: 200 });
}
