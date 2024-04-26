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
    const param = searchParams.get("keyword");
    if ( param != '' ) {
      let search = { $or: [ { 
          name :   {
              $regex: new RegExp(param, "ig")
      }  } , {
          symbol : {
              $regex : new RegExp ( param , "ig")
          }
      } , {
        token : {
              $regex : new RegExp ( param , "ig")
          }
      } ] }
      const result = await projectCollection.find(search).limit(100).toArray();
      return NextResponse.json(result, {
          status: 200,
       });
    } else {
        const result = await projectCollection.find().limit(100).toArray();
        return NextResponse.json(result, {
            status: 200,
        });
    }
}
