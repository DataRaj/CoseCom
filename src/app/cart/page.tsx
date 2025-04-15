"use client";

import AddressModal from "@/components/address-modal";
import CartOrderTable from "@/components/cart/CartOrderTable";
import { products } from "@/lib/app-data";
import { useSession } from "@/lib/auth-client";
import useCartStore from "@/store/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters").max(50, "Name is too long"),
  email: z.string().email(),
  phoneNumber: z.string().regex(/\d{10}/, "Invalid phone number"),
  addressLine: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string().default("India"),
  zipcode: z.string()
});

export default function CartPage() {
  const router = useRouter();
  const [address, setAddress] = useState<any>(null);
  const [open, setOpen] = useState(true);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const { data: session, } = useSession();
  const { cart, clearCart } = useCartStore();

  // console.log("cart: ", cart);
  const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { name: "", email: "", phoneNumber: "", addressLine: "", city: "", state: "", zipcode: "", country: "India" } });

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchAddressData = async () => {
      try {
        // console.log("Fetching addresses with userId:", session.user.id);

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/address?userId=${session.user.id}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch address: ${errorData.error || response.statusText}`);
        }
        const data = await response.json();
        // console.log("Fetched addresses:", data.address);
        setAddress(data.address); // Set the address state with the fetched data
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddress(null); // Set to null or some default value on error
      }
    };

    fetchAddressData();

  }, [session?.user?.id]); // ✅ Re-run when session.user.id changes

  // console.log(`here is an address: `, address)


  useEffect(() => {
    if (!Array.isArray(cart)) {
      // console.log("Resetting corrupted cart state");
      clearCart();
    }
  }, [cart]);



  const cartProducts = cart.map(({ productId, quantity }) => {
    const product = products.find(({ id }) => id === productId);
    return product ? { name: product.name, price: product.price, quantity } : null;
  }).filter(Boolean);

  const onSubmit = async (values: any) => {
    try {
      // Step 1: Create Order
      // @ts-ignore
      const totalAmount = cartProducts.reduce((total, { price, quantity }) => total + price * quantity, 0);
      const orderRes = await fetch(`/api/orders?userId=${session?.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: totalAmount }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderRes.json();
      // console.log("Order created:", orderData);

      // Step 2: Create Order Items
      const orderItemRes = await fetch(`/api/order-items?userId=${session?.user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderData.orderId, items: cart }),
      });

      if (!orderItemRes.ok) {
        throw new Error("Failed to create order items");
      }

      const orderItemData = await orderItemRes.json();
      // console.log("Order items created:", orderItemData);

      // Step 3: Process Payment via Razorpay
      const paymentRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, cartProducts }),
      });

      const paymentData = await paymentRes.json();
      // console.log("Payment Response:", paymentData);

      if (!paymentRes.ok || paymentData.status !== "issued" || !paymentData.customer_details) {
        throw new Error("Payment failed");
      }

      // Step 4: Clear Cart & Redirect to Success Page
      clearCart();
      router.push(
        `/cart/success?name=${paymentData.customer_details.name}&email=${paymentData.customer_details.email}&phoneNumber=${paymentData.customer_details.contact}&short_url=${paymentData.short_url}`
      );

    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      form.reset();
    }
  };


  return (
    <section className="p-2">
      <CartOrderTable />
      <div className="py-2">
        <h1 className="p-2 text-2xl font-bold">Checkout</h1>

        {!address ? (
          <>
            <div className="flex items-center justify-between p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700">There is no address in your account.</p>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setOpen(true)}
              >
                Please add one
              </button>
            </div>
            <AddressModal
              open={open}
              onOpenChange={setOpen}
            />
          </>
        ) : (
          <>
            <div className="space-y-6">
                          <div className="bg-background shadow rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="text-lg font-medium text-gray-100">Shipping Address</h2>
                              <button
                                className="text-sm text-blue-600 hover:text-blue-500"
                                onClick={() => setOpen(true)}
                              >
                                Edit
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-400">Name</p>
                                  <p className="mt-1 text-sm text-gray-100">{session?.user.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-400">Email</p>
                                  <p className="mt-1 text-sm text-gray-100">{session?.user.email}</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-400">Phone Number</p>
                                <p className="mt-1 text-sm text-gray-100">{address.mobile}</p>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-400">Address</p>
                                <p className="mt-1 text-sm text-gray-100">{address.address}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-400">City</p>
                                  <p className="mt-1 text-sm text-gray-100">{address.city}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-400">State</p>
                                  <p className="mt-1 text-sm text-gray-100">{address.state}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-400">Country</p>
                                  <p className="mt-1 text-sm text-gray-100">{address.country}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-400">Zipcode</p>
                                  <p className="mt-1 text-sm text-gray-100">{address.zip}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="confirmAddress"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              onChange={(e) => setConfirmAddress(e.target.checked)}
                            />
                            <label htmlFor="confirmAddress" className="text-sm text-gray-700">
                              I confirm that this shipping address is correct
                            </label>
                          </div>

                          <button
                            className="w-full py-3 px-4 text-black bg-primary hover:bg-[#d6b75c] animate-in duration-300  rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                            disabled={!confirmAddress}
                            onClick={() => onSubmit(address)}
                          >
                            Proceed to Payment
                          </button>
                        </div>


          </>
        )}
      </div>
    </section>
  );
}
