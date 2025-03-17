import { db } from "@/db";
import { addressTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
// GET address for user
export async function GET(req: NextRequest) {
  try {
    // Get userId from the URL query parameters using NextRequest's built-in method
    const userId = req.nextUrl.searchParams.get("userId");

    // Check if userId exists
      if (!userId || userId === "undefined") {
        console.log("Missing or invalid userId in request", { receivedValue: userId });
        return NextResponse.json({ error: "Missing or invalid userId" }, { status: 400 });
      }

    // console.log("Fetching addresses for userId:", userId);
// const userId = 'yy7AUhHOgTUfCTwUJynEymER0kQkf08S'
    const address = await db
      .select()
      .from(addressTable)
      .where(eq(addressTable.userId, userId.toString())).then(res => res[0]);

    if(!address) {
      // console.log("No address found for userId:", userId.toString());
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }
     // console.log(`Found ${JSON.stringify(address)} address for user ${userId}`);

    // Return the addresses
    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    // Detailed error logging
    console.error("Error in address GET endpoint:", {
      // @ts-ignore
      message: error.message,
      // @ts-ignore
      stack: error.stack,
      userId: req.nextUrl.searchParams.get("userId")
    });

    // Return a safe error response
    return NextResponse.json({
      error: "Internal server error",
      // @ts-ignore
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

// Create new address
export async function POST(req: NextRequest) {
  try {
    const userToken = req.headers.get("authorization");
      if (!userToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { userId, mobile, address, city, state, zip, country } = body;
    // console.log("here is the user address, ", mobile, address, city, state, zip, country)
    if (!userId ||!mobile || !address || !city || !state || !zip || !country || !country.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


    const [newAddress] = await db.insert(addressTable).values({ userId, mobile, address, city, state, zip, country }).returning();
    return NextResponse.json({ address: newAddress }, { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update address
export async function PATCH(req: NextRequest) {
  try {
    const userToken = req.headers.get("authorization");
    if (!userToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, userId, address, city, state, zip, country } = body;
    if (!id || !userId) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const existingAddress = await db.select().from(addressTable).where(eq(addressTable.id, id)).then(res => res[0]);
    if (!existingAddress || existingAddress.userId !== userId) {
      return NextResponse.json({ error: "Address not found or unauthorized" }, { status: 404 });
    }

    const [updatedAddress] = await db.update(addressTable)
      .set({
        address: address || existingAddress.address,
        city: city || existingAddress.city,
        state: state || existingAddress.state,
        zip: zip || existingAddress.zip,
        country: country || existingAddress.country,
        updatedAt: new Date(),
      })
      .where(eq(addressTable.id, id))
      .returning();

    return NextResponse.json({ address: updatedAddress }, { status: 200 });
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete address
export async function DELETE(req: NextRequest) {
  try {
    const userToken = req.headers.get("authorization");
    if (!userToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    if (!id || !userId) return NextResponse.json({ error: "Missing address ID or user ID" }, { status: 400 });

    const existingAddress = await db.select().from(addressTable).where(eq(addressTable.id, id)).then(res => res[0]);
    if (!existingAddress || existingAddress.userId !== userId) {
      return NextResponse.json({ error: "Address not found or unauthorized" }, { status: 404 });
    }

    await db.delete(addressTable).where(eq(addressTable.id, id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
