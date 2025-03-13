// app/api/orders/route.ts
import { db } from "@/db";
import { orderItemsTable, ordersTable, cartItemsTable} from "@/db/schema";
// import { useSession } from "@/lib/auth-client";
import { desc, eq, and, inArray  } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { products } from "@/lib/app-data";

export async function POST(req: NextRequest) {
  try {
    // Extract token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) return NextResponse.json({ error: "Invalid Token" }, { status: 401 });

    const userId = decoded.id;

    // Parse request body
    const { cartItems } = await req.json();
    if (!cartItems || !cartItems.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    // Get product details to check stock and calculate total price
    const productIds = cartItems.map((item: any) => item.id);
    const _products = products.filter((p) => productIds.includes(p.id));

    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = _products.find((p) => p.id === item.id);
      if (!product) return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });

      if (product.stock < item.quantity)
        return NextResponse.json({ error: `Insufficient stock for ${item.name}` }, { status: 400 });

      total += item.price * item.quantity;
      orderItems.push({ productId: item.id, quantity: item.quantity });
    }

    // Create Order
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId, status: "pending", total })
      .returning({ id: ordersTable.id });

    // Insert Order Items
    await db.insert(orderItemsTable).values(orderItems.map((item) => ({ ...item, orderId: newOrder.id })));

    // Reduce Stock
    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.id);
      if (!product) return NextResponse.json({ error: `Product ${item.name} not found` }, { status: 404 });
      products.find((p) => p.id === item.id)!.stock -= item.quantity;
      
    }

    // Clear Cart
    await db.delete(cartItemsTable).where(and(eq(cartItemsTable.userId, userId), inArray(cartItemsTable.productId, productIds)));

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
