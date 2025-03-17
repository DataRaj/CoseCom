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
  const { data: session, status } = useSession();
  const { cart, clearCart } = useCartStore();
  const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { name: "", email: "", phoneNumber: "", addressLine: "", city: "", state: "", zipcode: "", country: "India" } });
  console.log("Session:", session);

  useEffect(() => {

    const getAddress = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/address`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'authorization': session?.session.token!,
          },
          body: JSON.stringify({ userId: session?.session.userId }),
        });
        const data = await response.json();
        if (data.addresses && data.addresses.length > 0) {
          setAddress(data.addresses[0]);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    getAddress();
  }, []);

  useEffect(() => {
    if (!Array.isArray(cart)) {
      console.log("Resetting corrupted cart state");
      clearCart();
    }
  }, [cart]);



  const onSubmit = async (values: any) => {
    try {
      const cartProducts = cart.map(({ productId, quantity }) => {
        const product = products.find(({ id }) => id === productId);
        return product ? { name: product.name, price: product.price, quantity } : null;
      }).filter(Boolean);

      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, cartProducts }),
      });

      const data = await res.json();
      console.log("API Response:", data); // Debugging

      if (res.ok && data.status === "issued" && data.customer_details) {
        clearCart();
        router.push(`/cart/success?name=${data.customer_details.name}&email=${data.customer_details.email}&phoneNumber=${data.customer_details.contact}&short_url=${data.short_url}`);
      } else {
        console.error("Payment failed:", data.error || "Invalid response structure");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }

    form.reset();
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
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
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
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="mt-1 text-sm text-gray-900">{address.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">{address.email}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="mt-1 text-sm text-gray-900">{address.phoneNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="mt-1 text-sm text-gray-900">{address.addressLine}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">City</p>
                      <p className="mt-1 text-sm text-gray-900">{address.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">State</p>
                      <p className="mt-1 text-sm text-gray-900">{address.state}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Country</p>
                      <p className="mt-1 text-sm text-gray-900">{address.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Zipcode</p>
                      <p className="mt-1 text-sm text-gray-900">{address.zipcode}</p>
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
                className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!confirmAddress}
                onClick={() => onSubmit(address)}
              >
                Proceed to Payment
              </button>
            </div>

            <AddressModal
              open={open}
              onOpenChange={setOpen}

            />
          </>
        )}
      </div>
    </section>
  );
}
