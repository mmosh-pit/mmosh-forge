import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;


export async function POST(req: NextRequest) {
    const directoryCollection = db.collection("mmosh-app-directory");
    const authtoken = await getToken({ req, secret });
    if (!authtoken || !authtoken.sub){
    return NextResponse.json(null, {
        status: 200,
    });
    }
    const params = await req.json();
    directoryCollection.insertOne({
        basekey: params.basekey,
        basename: params.basename,
        basesymbol: params.basesymbol,
        baseimg: params.baseimg,
        bonding: params.bonding,
        targetname: params.targetname,
        targetsymbol: params.targetsymbol,
        targetimg: params.targetimg,
        value: params.value,
        price: params.price,
        type: params.type,
        wallet: params.wallet,
        created_date: new Date(),
        updated_date: new Date()
    })
    return NextResponse.json("", { status: 200 });
}
