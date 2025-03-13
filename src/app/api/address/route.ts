import { db } from "@/db";
import { addressTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userToken = req.headers.get('authorization');
    if (!userToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { userId } = body;
    const user = await db.select().from(userTable).where(eq(userTable.id, userId));

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const address = await db.select().from(addressTable).where(eq(addressTable.userId, userId)).then((res) => res[0]);

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    console.error("Failed to perform action:", error);
    return NextResponse.json(
      { error: "Failed to get user id" },
      { status: 500 }
    );
  }
}
