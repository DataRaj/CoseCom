// import { db } from "@/db";
// import { orderItemsTable } from "@/db/schema";
// import { products } from "@/lib/app-data";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     // Extract token from headers
//     const authHeader = req.headers.get("authorization");
//     const userId = req.nextUrl.searchParams.get("userId");
//     if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


//     if (!userId || userId === "undefined") {
//       console.log("Missing or invalid userId in request", { receivedValue: userId });
//       return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
//     }

//     const { orderId, items } = await req.json();

//     if (!items || !items.length ) return NextResponse.json({ error: "Cart is empty"
//     }, { status: 400 });
//     else if(!orderId) return NextResponse.json({ error: "Missing orderId"
//     }, { status: 400 });

//     // Get product details to check stock and calculate total price
//     const productIds = items.map((item: any) => item.productId);
//     const _products = products.filter((p) => productIds.includes(p.id));

//     for (const item of items) {
//       const product = _products.find((p) => p.id === item.productId);
//       if (!product) return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });

//       if (product.stock < item.quantity)
//         return NextResponse.json({ error: `Insufficient stock for ${item.name}` }, { status: 400 });
//     }

//     // Insert Order Items
//     await db.insert(orderItemsTable).values(items.map((item: any) => ({ orderId, productId: item.productId, quantity: item.quantity })));

//     // Reduce Stock
//     for (const item of items) {
//       const product = products.find((p) => p.id === item.productId);
//       if (!product) return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });
//       products.find((p) => p.id === item.productId)!.stock -= item.quantity;

//     }

//     return NextResponse.json({ message: "Order placed successfully", orderId: orderId });
//   } catch (error) {
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }



import { db } from "@/db";
import { orderItemsTable } from "@/db/schema";
import { products } from "@/lib/app-data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const authHeader = req.headers.get("authorization");
    const userId = req.nextUrl.searchParams.get("userId");
    // if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!userId || userId === "undefined") return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });

    const { orderId, items } = await req.json();
    // console.log(`here is an orderId: ${orderId} and items: ${items[0].productId}`)
    if (!items?.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    // Create a Map for faster lookups
    const productMap = new Map(products.map((p) => [p.id, p]));

    for (const item of items) {
      const product = productMap.get(item.productId);
      // console.log(`here is a product: ${product}`)
      if (!product) return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });
      if (product.stock < item.quantity) return NextResponse.json({ error: `Insufficient stock for ${item.name}` }, { status: 400 });
    }

    // Insert Order Items
    await db.insert(orderItemsTable).values(items.map((item: any) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
    })));

    // Return updated product stock (since modification in memory doesn't persist)
    const updatedProducts = products.map((p) => ({
      ...p,
      stock: p.stock - (items.find((item: any) => item.productId === p.id)?.quantity || 0),
    }));

    return NextResponse.json({ message: "Order placed successfully", orderId, updatedProducts });
  } catch (error) {
    console.error("Order creation error:", error);
    // @ts-ignore
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Orders retrieved successfully" });
}
