 // app/api/orders/route.ts
import { db } from "@/db";
import { ordersTable } from "@/db/schema";
// import { useSession } from "@/lib/auth-client";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    // Extract token from headers
    // const authHeader = req.headers.get("authorization");
    const userId = req.nextUrl.searchParams.get("userId");

    // console.log(`here is an userId: ${userId}`)
    // console.log(`here is an authHeader: ${authHeader}`)
    // if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // const token = authHeader.split(" ")[1];
    // const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    // if (!decoded) return NextResponse.json({ error: "Invalid Token" }, { status: 401 });

    // const userId = decoded.id;

    // Parse request body


    if (!userId || userId === "undefined") {
      console.log("Missing or invalid userId in request", { receivedValue: userId });
      return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
    }

    const { total } = await req.json();

    // Create Order
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId, status: "pending", total })
      .returning({ id: ordersTable.id });


    if(!newOrder.id) return NextResponse.json({ error: "Failed to create order" }, { status: 500 });

    return NextResponse.json({ message: "Order placed successfully", orderId: newOrder.id });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}



// READ: Get all orders for the current user
export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;
    // const session = await auth.api.getSession();

    // if (!session) {
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const orders = await db.select()
      .from(ordersTable)
      .where(eq(ordersTable.userId, userId))
      .orderBy(desc(ordersTable.createdAt));

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
