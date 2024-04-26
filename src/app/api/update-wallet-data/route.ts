import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  const collection = db.collection("mmosh-app-profiles");
  const tokener = await getToken({ req, secret });
  if (!tokener || !tokener.sub){
    return NextResponse.json(null, {
      status: 200,
    });
  }
  const { field, value, wallet } = await req.json();

  const user = await collection.findOne({
    wallet,
  });

  if (user) {
    await collection.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          [field]: value,
        },
      },
    );
    return NextResponse.json("", { status: 200 });
  }

  return NextResponse.json("User not found", { status: 400 });
}
