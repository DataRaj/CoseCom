import { db } from "@/db";
import { addressTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
// GET address for user
export async function GET(req: NextRequest) {
  try {
    // const userToken = req.headers.get("authorization");
    // if (!userToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { userId } = body;
    console.log("here is the user id", userId)
    const user = await db.select().from(userTable).where(eq(userTable.id, userId)).then(res => res[0]);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const addresses = await db.select().from(addressTable).where(eq(addressTable.userId, userId));
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Create new address
export async function POST(req: NextRequest) {
  try {
    const userToken = req.headers.get("authorization");
      if (!userToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { userId, address, city, state, zip, country } = body;
    console.log("here is the user address, \s",  userId, address, city, state, zip, country)
    if (userId || !address || !city || !state || !zip || !country || !country.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


    const [newAddress] = await db.insert(addressTable).values({ userId, address, city, state, zip, country }).returning();
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
