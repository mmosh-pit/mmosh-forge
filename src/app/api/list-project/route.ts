import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const projectCollection = db.collection("mmosh-app-projects");
    const result = await projectCollection.find().toArray();
    return NextResponse.json(result, {
        status: 200,
    });
}
