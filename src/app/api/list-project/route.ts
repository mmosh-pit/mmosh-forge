import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const projectCollection = db.collection("mmosh-app-projects");
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
