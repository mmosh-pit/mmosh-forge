import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;


export async function GET(req: NextRequest) {
    const projectCollection = db.collection("mmosh-app-projects");
    const token = await getToken({ req, secret });
    if (!token || !token.sub){
      return NextResponse.json(null, {
        status: 200,
      });
    }
    const { searchParams } = new URL(req.url);
    const project = searchParams.get("project");
    const result = await projectCollection.findOne({project});
    if(result) {
        return NextResponse.json(result, {
            status: 200,
        });
    } else {
        return NextResponse.json("", {
            status: 200,
        });
    }
}
