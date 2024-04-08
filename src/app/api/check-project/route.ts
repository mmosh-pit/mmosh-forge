import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const projectCollection = db.collection("mmosh-app-projects");

  const { searchParams } = new URL(req.url);
  const param = searchParams.get("project");

  const project = await projectCollection.findOne(
    {
      "symbol": param,
    },
  );

  return NextResponse.json(!!project, {
    status: 200,
  });
}
