export const runtime = "edge";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const razorpayID = process.env.RAZORPAY_ID;
  const razorpayKey = process.env.RAZORPAY_KEY;

  if (!razorpayID || !razorpayKey) {
    return NextResponse.json({ error: "Razorpay credentials missing" }, { status: 500 });
  }

  try {
    const body = await request.json();

    const lineItems = body.cartProducts.map((product: any) => ({
      name: product.name,
      amount: product.price * 87 * 100, // Convert to paisa
      currency: "INR",
      quantity: product.quantity,
    }));

    const invoice = {
      type: "invoice",
      customer: {
        name: body.name,
        email: body.email,
        contact: body.phoneNumber,
        shipping_address: {
          line1: body.addressLine,
          city: body.city,
          state: body.state,
          country: "India",
          zipcode: body.zipcode,
        },
      },
      line_items: lineItems,
    };

    const response = await fetch("https://api.razorpay.com/v1/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${razorpayID}:${razorpayKey}`).toString("base64")}`,
      },
      body: JSON.stringify(invoice),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: "Failed to create invoice", details: errorData }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Internal server error", details: errorMessage }, { status: 500 });
  }
}
