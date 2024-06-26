import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  const tokenCollection = db.collection("mmosh-app-tokens");
  const tokener = await getToken({ req, secret });
  if (!tokener || !tokener.sub){
    return NextResponse.json(null, {
      status: 200,
    });
  }
  const { name, symbol, image, tokenaddress, bondingaddress } = await req.json();

  const token = await tokenCollection.findOne({
    token: tokenaddress,
  });

  if (token) {
    return NextResponse.json("", { status: 200 });
  } else {
     tokenCollection.insertOne({
        name,
        symbol: symbol.toLowerCase(),
        image,
        token: tokenaddress,
        bonding: bondingaddress,
        created_date: new Date(),
        updated_date: new Date()
      })
      return NextResponse.json("", { status: 200 });
  }
}
