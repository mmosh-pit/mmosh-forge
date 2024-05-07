import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";
const secret = process.env.NEXTAUTH_SECRET;


export async function GET(req: NextRequest) {
    const collection = db.collection("mmosh-app-tokens");
    const directoryCollection = db.collection("mmosh-app-directory");
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    const limit = 10;
    const offset = Number(searchParams.get("page")) * limit;
    const volume = searchParams.get("volume") ? searchParams.get("volume") : "hour";

    let search = {};
    if(keyword) {
        search = { $or: [ { 
            name :   {
                $regex: new RegExp(keyword, "ig")
        }  } , {
            symbol : {
                $regex : new RegExp ( keyword , "ig")
            }
        } , {
            token : {
                $regex : new RegExp ( keyword , "ig")
            }
        }]}
    }

    const tokenResults = await collection.find(search).sort({created_date: -1}).skip(offset).limit(limit).toArray();
    for (let index = 0; index < tokenResults.length; index++) {
        const element = tokenResults[index];
    }

    var d = new Date();
    var filterDate;
    if(volume == "hour") {
        filterDate = new Date(d.setHours(d.getHours() - 1));
    } else if(volume == "day") {
        filterDate = new Date(d.setDate(d.getDate() - 1));
    } else if(volume == "week") {
        filterDate = new Date(d.setDate(d.getDate() - 7));
    } else if (volume == "month") {
        filterDate = new Date(d.setMonth(d.getMonth() - 1));
    } else if (volume == "year") {
        filterDate =  new Date(d.setFullYear(d.getFullYear() - 1));
    }

    const finalResult = []

    for (let index = 0; index < tokenResults.length; index++) {
        const element = tokenResults[index];

        // total volume calculation
        const volumeresult = await directoryCollection.aggregate(   [
            { $match : { bonding:element.bonding, created_date: {$gte: filterDate}  } },
            {
                $group:
                {
                    _id: {},
                    totalAmount: { $sum: "$value" },
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
        let totalVolume = 0;
        for (let index = 0; index < volumeresult.length; index++) {
            const volumeelement = volumeresult[index];
            totalVolume = volumeelement.totalAmount
        }

        // last hour price
        const onehourResult1 = await directoryCollection.find({
            bonding:element.bonding,
            created_date: {$lte: new Date(new Date().setHours(new Date().getHours() - 1))}
        }).sort({created_date:1}) .limit(1).toArray();

        const onehourResult2 = await directoryCollection.find({
            bonding:element.bonding
        }).sort({created_date:1}) .limit(1).toArray();

        let oneHourPriceStart = 0;
        for (let index = 0; index < onehourResult1.length; index++) {
            const volumeelement = onehourResult1[index];
            oneHourPriceStart = volumeelement.price
        }

        let oneHourPriceEnd = 0;
        for (let index = 0; index < onehourResult2.length; index++) {
            const volumeelement = onehourResult2[index];
            oneHourPriceEnd = volumeelement.price
        }

        // last day price
        const oneDatResult1 = await directoryCollection.find({
            bonding:element.bonding,
            created_date: {$lte: new Date(new Date().setDate(new Date().getDate() - 1))}
        }).sort({created_date:1}) .limit(1).toArray();

        const oneDatResult2 = await directoryCollection.find({
            bonding:element.bonding
        }).sort({created_date:1}) .limit(1).toArray();

        let oneDayPriceStart = 0;
        for (let index = 0; index < oneDatResult1.length; index++) {
            const volumeelement = oneDatResult1[index];
            oneDayPriceStart = volumeelement.price
        }

        let oneDayPriceEnd = 0;
        for (let index = 0; index < oneDatResult2.length; index++) {
            const volumeelement = oneDatResult2[index];
            oneDayPriceEnd = volumeelement.price
        }

        const labels = [];
        for (let index = 0; index < 7; index++) {
            let volType = new Date(new Date().setDate(new Date().getDate() - index));
            labels.push({
                label: volType.toLocaleString('en-us',{month:'short', day:'numeric'}),
                value: 0
            })
        }
        
        const buyresult = await directoryCollection.aggregate(   [
            { $match : { created_date: {$gte: new Date(d.setDate(d.getDate() - 13))}  } },
            {
                $group:
                {
                    _id: {year:{date: "$created_date"}},
                    totalAmount: { $sum: "$value" },
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
    
        console.log("buyresult ", buyresult)
    
    
        for (let index = 0; index < buyresult.length; index++) {
            const buyelement = buyresult[index];
           for (let index = 0; index < labels.length; index++) {
               const element = labels[index];
 
                if(new Date(buyelement._id.year.date).toLocaleString('en-us',{month:'short', day:'numeric'}) == element.label) {
                    labels[index].value = labels[index].value + buyelement.totalAmount
                }

           }
        }
    


    
        finalResult.push({
            name: element.name,
            symbol: element.symbol,
            image: element.image,
            token: element.token,
            bonding: element.bonding,
            price_oneh_start: oneHourPriceStart,
            price_oneh_end:oneHourPriceEnd,
            price_oneday_start: oneDayPriceStart,
            price_oneday_end:oneDayPriceEnd,
            volume: totalVolume,
            price: oneHourPriceEnd,
            price_last_seven_days: labels
        })
    }

    return NextResponse.json(finalResult, {
        status: 200,
    });
    


}
