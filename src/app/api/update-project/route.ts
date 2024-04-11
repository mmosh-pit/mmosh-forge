import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const collection = db.collection("mmosh-app-projects");

  const { field, value, project } = await req.json();

  const projectDetail = await collection.findOne({
    project,
  });

  if (projectDetail) {
    await collection.updateOne(
      {
        _id: projectDetail._id,
      },
      {
        $set: {
          [field]: value,
        },
      },
    );
    return NextResponse.json("", { status: 200 });
  }

  return NextResponse.json("Project not found", { status: 400 });
}
