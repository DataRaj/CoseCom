// // app/api/order-items/[id]/route.ts
// import { db } from "@/db";
// import { orderItemsTable, ordersTable } from "@/db/schema";
// // import { useSessionStore } from "@/store/sessionStore";
// import { eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@/lib/auth";





// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

// // UPDATE: Update an order item quantity
// export async function PATCH(req: NextRequest, { params }: RouteParams) {

//   try {

//   //   if (!getUserId) {
//   //     return NextResponse.json(
//   //       { error: "Unauthorized" },
//   //       { status: 401 }
//   //     );
//   //   }

//     const { id } = params;
//     const body = await req.json();
//     const { quantity, userId } = body;

//     if (quantity === undefined || quantity < 1) {
//       return NextResponse.json(
//         { error: "Valid quantity is required" },
//         { status: 400 }
//       );
//     }

//     // First get the order item
//     const orderItem = await db.select().from(orderItemsTable).where(eq(orderItemsTable.id, id))
//       // with: {
//       //   order: true,
//       // },
//     // });

//     if (!orderItem) {
//       return NextResponse.json(
//         { error: "Order item not found" },
//         { status: 404 }
//       );
//     }

//     // Verify order belongs to the user
//     if (orderItem.userId !== userId) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 403 }
//       );
//     }

//     const now = new Date();
//     const [updatedOrderItem] = await db
//       .update(orderItemsTable)
//       .set({
//         quantity,
//         updatedAt: now,
//       })
//       .where(eq(orderItemsTable.id, id))
//       .returning();

//     return NextResponse.json({ orderItem: updatedOrderItem }, { status: 200 });
//   } catch (error) {
//     console.error("Failed to update order item:", error);
//     return NextResponse.json(
//       { error: "Failed to update order item" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Remove an item from an order
// export async function DELETE(req: NextRequest, { params }: RouteParams) {
//   try {
//     // const session = await auth.getSession();

//     // if (!session) {
//     //   return NextResponse.json(
//     //     { error: "Unauthorized" },
//     //     { status: 401 }
//     //   );
//     // }

//     const { id } = params;
//     const body = await req.json();
//     const { userId } = body;
//     // First get the order item
//     const orderItem = await db.query.orderItemsTable.findFirst({
//       where: eq(orderItemsTable.id, id),
//       with: {
//         order: true,
//       },
//     });

//     if (!orderItem) {
//       return NextResponse.json(
//         { error: "Order item not found" },
//         { status: 404 }
//       );
//     }

//     // Verify order belongs to the user
//     if (orderItem.order.userId !== userId ) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 403 }
//       );
//     }

//     // Delete the order item
//     await db.delete(orderItemsTable).where(eq(orderItemsTable.id, id));

//     // Check if this was the last item in the order
//     const remainingItems = await db.select()
//       .from(orderItemsTable)
//       .where(eq(orderItemsTable.order_id, orderItem.order_id));

//     // If no items remain, update order status to 'canceled' or delete the order
//     if (remainingItems.length === 0) {
//       // Option 1: Delete the order
//       // await db.delete(ordersTable).where(eq(ordersTable.id, orderItem.order_id));

//       // Option 2: Update the order status
//       await db.update(ordersTable)
//         .set({
//           status: "canceled",
//           updatedAt: new Date(),
//         })
//         .where(eq(ordersTable.id, orderItem.order_id));
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Failed to delete order item:", error);
//     return NextResponse.json(
//       { error: "Failed to delete order item" },
//       { status: 500 }
//     );
//   }
// }
