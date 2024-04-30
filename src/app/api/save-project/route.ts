import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;


export async function POST(req: NextRequest) {
  const projectCollection = db.collection("mmosh-app-projects");
  const token = await getToken({ req, secret });
  if (!token || !token.sub){
    return NextResponse.json(null, {
      status: 200,
    });
  }
  const { name, symbol, coinimage, desc, image, passimg, inviteimg, project, tokenaddress, lut, seniority, telegram  } = await req.json();

  const projectDetail = await projectCollection.findOne({
    project: project,
  });

  if (projectDetail) {
    return NextResponse.json("", { status: 200 });
  } else {
    projectCollection.insertOne({
        name,
        symbol: symbol.toLowerCase(),
        desc,
        image,
        coinimage,
        passimg,
        inviteimg,
        token: tokenaddress,
        project,
        lut,
        seniority,
        telegram,
        created_date: new Date(),
        updated_date: new Date()
      })
      return NextResponse.json("", { status: 200 });
  }
}
