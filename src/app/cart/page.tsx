"use client";

import AddressModal from "@/components/address-modal";
import CartOrderTable from "@/components/cart/CartOrderTable";
import { products } from "@/lib/app-data";
import { useSession } from "@/lib/auth-client";
import useCartStore from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

// Component for table rows loading animation
const TableRowLoading = () => (
  <div className="w-full animate-pulse">
    <div className="flex items-center space-x-4 p-4 border-b border-gray-700/30">
      <div className="h-16 w-16 rounded-md bg-gray-700/40"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700/40 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700/40 rounded w-1/2"></div>
      </div>
      <div className="h-8 w-16 bg-gray-700/40 rounded"></div>
    </div>
  </div>
);

// Component for address form loading animation
const AddressFormLoading = () => (
  <div className="space-y-4 animate-pulse">
    <div className="bg-background shadow rounded-lg p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-700/40 rounded w-36"></div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/40 rounded w-24"></div>
          <div className="h-6 bg-gray-700/40 rounded w-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/40 rounded w-20"></div>
          <div className="h-6 bg-gray-700/40 rounded w-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/40 rounded w-16"></div>
            <div className="h-6 bg-gray-700/40 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Button loading state component
const ButtonLoading = () => (
  <button 
    className="w-full py-3 px-4 bg-primary/60 rounded-md font-medium text-black flex items-center justify-center cursor-not-allowed"
    disabled
  >
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  </button>
);

export default function CartPage() {
  const router = useRouter();
  const [address, setAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const { data: session } = useSession();
  const { cart, clearCart } = useCartStore();
  
  // Separate loading states for different page sections
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  useEffect(() => {
    // Simulate cart loading (would normally be fetching data)
    setTimeout(() => setLoadingCart(false), 800);
    
    if (!session?.user?.id) return;
    
    const fetchAddressData = async () => {
      setLoadingAddress(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/address?userId=${session.user.id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch address: ${errorData.error || response.statusText}`);
        }
        
        const data = await response.json();
        setAddress(data.address);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddress(null);
      } finally {
        // Add a slight delay for smoother transition
        setTimeout(() => setLoadingAddress(false), 400);
      }
    };

    fetchAddressData();
  }, [session?.user?.id]);

  useEffect(() => {
    if (!Array.isArray(cart)) {
      clearCart();
    }
  }, [cart, clearCart]);

  const cartProducts = cart.map(({ productId, quantity }) => {
    const product = products.find(({ id }) => id === productId);
    return product ? { name: product.name, price: product.price, quantity } : null;
  }).filter(Boolean);

  const onSubmit = async (values) => {
    try {
      setProcessingPayment(true);
      
      // Step 1: Create Order
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

      // Step 3: Process Payment via Razorpay
      const paymentRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, cartProducts }),
      });

      const paymentData = await paymentRes.json();

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
      setProcessingPayment(false);
    }
  };

  return (
    <section className="p-2 space-y-6">
      <div className="transition-all duration-300 ease-in-out">
        {loadingCart ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4">
              <div className="h-6 bg-gray-700/40 rounded w-32 animate-pulse"></div>
              <div className="h-6 bg-gray-700/40 rounded w-24 animate-pulse"></div>
            </div>
            <TableRowLoading />
            <TableRowLoading />
          </div>
        ) : (
          <div className="opacity-100 transition-opacity duration-500 ease-in">
            <CartOrderTable />
          </div>
        )}
      </div>
      
      <div className="py-2">
        <h1 className="p-2 text-2xl font-bold">Checkout</h1>

        <div className="transition-all duration-300 ease-in-out">
          {loadingAddress ? (
            <AddressFormLoading />
          ) : !address ? (
            <div className="opacity-0 animate-fadeIn">
              <div className="flex items-center justify-between p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700">There is no address in your account.</p>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#d3b76c] rounded-md hover:bg-[#c2a45c] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => setOpen(true)}
                >
                  Please add one
                </button>
              </div>
              
              <AddressModal
                open={open}
                onOpenChange={setOpen}
              />
            </div>
          ) : (
            <div className="space-y-6 opacity-0 animate-fadeIn">
              <div className="bg-background shadow rounded-lg p-6 border border-gray-800 transition-all duration-300 hover:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-100">Shipping Address</h2>
                  <button
                    className="text-sm text-primary hover:text-[#d6b75c] transition-colors duration-200"
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
                  className="h-4 w-4 text-primary focus:ring-[#d6b75c] border-gray-400 rounded transition-colors duration-200"
                  onChange={(e) => setConfirmAddress(e.target.checked)}
                />
                <label htmlFor="confirmAddress" className="text-sm text-gray-700">
                  I confirm that this shipping address is correct
                </label>
              </div>

              {processingPayment ? (
                <ButtonLoading />
              ) : (
                <button
                  className="w-full py-3 px-4 text-black bg-primary hover:bg-[#d6b75c] transition-colors duration-300 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.98]"
                  disabled={!confirmAddress}
                  onClick={() => onSubmit(address)}
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
