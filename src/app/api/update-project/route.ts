import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest) {
  const collection = db.collection("mmosh-app-projects");
  const tokener = await getToken({ req, secret });
  if (!tokener || !tokener.sub){
    return NextResponse.json(null, {
      status: 200,
    });
  }
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
