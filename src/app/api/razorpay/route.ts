export const runtime = "edge";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const razorpayID = process.env.RAZORPAY_ID;
  const razorpayKey = process.env.RAZORPAY_KEY;

  if(process.env.NODE_ENV === "development") {
    console.log(`here is a razorpay id: ${razorpayID}` );
    console.log(`here is a razorpay key: ${razorpayKey}` );
  }

  if (!razorpayID || !razorpayKey) {
    return NextResponse.json({ error: "Razorpay credentials missing" }, { status: 500 });
  }

  try {
    const body = await request.json();
    // console.log(`here is a data from the body of razerpay: ${JSON.stringify(body)}` )
    const lineItems = body.cartProducts.map((product: any) => ({
      name: product.name,
      amount: product.price * 100 * 8.7, // Convert to paisa
      currency: "INR",
      quantity: product.quantity,
    }));
    // if(process.env.NODE_ENV === "development") {
    //   console.log(`here is a data from the body of razerpay: ${JSON.stringify(body)}` );
    //   console.log(`here is a customer name from the body of razerpay: ${body.name}` );
    //   console.log(`here is a data from the line items of razerpay: ${JSON.stringify(lineItems)}` );
    // }

    if (!body.name || !body.email || !body.mobile || !body.address || !body.city || !body.state || !body.country || !body.zip) {
      console.error("Missing required customer details:", {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      address: body.address,
      city: body.city,
      state: body.state,
      country: body.country,
      zip: body.zip,
      });
      return NextResponse.json({ error: "Missing required customer details" }, { status: 400 });
    }

    const invoice = {
      type: "invoice",
      customer: {
      name: body.name,
      email: body.email,
      contact: body.mobile,
      shipping_address: {
        line1: body.address,
        city: body.city,
        state: body.state,
        country: body.country,
        zipcode: body.zip,
      },
      },
      line_items: lineItems,
    };

    const authToken = Buffer.from(`${razorpayID}:${razorpayKey}`).toString("base64");
console.log("Auth token starts with:", authToken.substring(0, 5)); // Safe logging of prefix

const response = await fetch("https://api.razorpay.com/v1/invoices", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${authToken}`,
  },
  body: JSON.stringify(invoice),
});

    if (!response.ok) {
      const responseText = await response.text(); // Get raw response
      console.log("Error response from Razorpay:", responseText);
      return NextResponse.json({ 
        error: "Failed to create invoice", 
        status: response.status,
        responseText: responseText.substring(0, 500) // Include part of the response for debugging
      }, { status: 500 });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (jsonError) {
    // @ts-ignore
    console.log("Invalid JSON response:", jsonError.message);
    return NextResponse.json({ 
      error: "Invalid JSON response", 
      // @ts-expect-error sdf
      details: jsonError.message
    }, { status: 500 });
}
}