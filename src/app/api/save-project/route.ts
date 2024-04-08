import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const projectCollection = db.collection("mmosh-app-projects");

  const { name, symbol, coinimage, desc, image, project, tokenaddress, lut  } = await req.json();

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
        token: tokenaddress,
        project,
        lut,
        created_date: new Date(),
        updated_date: new Date()
      })
      return NextResponse.json("", { status: 200 });
  }
}
