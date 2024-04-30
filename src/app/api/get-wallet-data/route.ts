import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");
  
  const token = await getToken({ req, secret });
  if (!token || !token.sub){
    return NextResponse.json(null, {
      status: 200,
    });
  }

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("wallet");

  const user = await collection.findOne({
    wallet: param,
  });

  return NextResponse.json(user, {
    status: 200,
  });
}
