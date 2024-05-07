import { db } from "../../lib/mongoClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const collection = db.collection("mmosh-app-directory");

    const results = []
    const labels = [];
    for (let index = 0; index < 14; index++) {
        let volType = new Date(new Date().setDate(new Date().getDate() - index));
        labels.push({
            label: volType.toLocaleString('en-us',{month:'short', day:'numeric'}),
            value: 0
        })
       
    }

    console.log("labels ", labels)

    var d = new Date();

    var filterDate = new Date(d.setDate(d.getDate() - 13));
    var idFitler = {year:{date: "$created_date"}}
    
    let buylabels = labels;
    const buyresult = await collection.aggregate(   [
        { $match : { created_date: {$gte: filterDate}, type: "buy"  } },
        {
            $group:
            {
                _id: idFitler,
                totalAmount: { $sum: "$value" },
                count: { $sum: 1 }
            }
        }
    ]).toArray();

    console.log("buyresult ", buyresult)
    for (let index = 0; index < buyresult.length; index++) {
        const buyelement = buyresult[index];
       for (let index = 0; index < buylabels.length; index++) {
            const element = buylabels[index];
            if(new Date(buyelement._id.year.date).toLocaleString('en-us',{month:'short', day:'numeric'}) == element.label) {
                buylabels[index].value = buylabels[index].value + buyelement.totalAmount
            }
       }
    }

    let selllabels = labels;
    const sellresult = await collection.aggregate(   [
        { $match : { created_date: {$gte: filterDate}, type: "sell"  } },
        {
            $group:
            {
                _id: idFitler,
                totalAmount: { $sum: "$value" },
                count: { $sum: 1 }
            }
        }
    ]).toArray();

    console.log("buyresult ", sellresult)
    for (let index = 0; index < sellresult.length; index++) {
        const sellelement = sellresult[index];
       for (let index = 0; index < selllabels.length; index++) {
            const element = selllabels[index];
            if(new Date(sellelement._id.year.date).toLocaleString('en-us',{month:'short', day:'numeric'}) == element.label) {
                selllabels[index].value = selllabels[index].value + sellelement.totalAmount
            }
       }
    }

    const buyfullresult = await collection.aggregate([
        { $match : { type: "buy"  } },
        {
            $group:
            {
                _id: { year: {} },
                totalAmount: { $sum: "$value" },
                count: { $sum: 1 }
            }
        }
    ]).toArray();

    let totalBuyTVL = 0;
    for (let index = 0; index < buyfullresult.length; index++) {
        const element = buyfullresult[index];
        totalBuyTVL = totalBuyTVL + element.totalAmount;
    }

    const sellfullresult = await collection.aggregate([
        { $match : { type: "sell"  } },
        {
            $group:
            {
                _id: { year: {} },
                totalAmount: { $sum: "$value" },
                count: { $sum: 1 }
            }
        }
    ]).toArray();

    let totalSellTVL = 0;
    for (let index = 0; index < sellfullresult.length; index++) {
        const element = sellfullresult[index];
        totalSellTVL = totalSellTVL + element.totalAmount;
    }
    
    return NextResponse.json({
        buylabels: buylabels,
        selllabels: selllabels,
        totalbuy: totalBuyTVL,
        totalsell: totalSellTVL
    }, {
        status: 200,
    });

}
