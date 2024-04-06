import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const projectCollection = db.collection("mmosh-app-projects");
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
