"use client";

import AddressModal from "@/components/address-modal";
import CartOrderTable from "@/components/cart/CartOrderTable";
import { products } from "@/lib/app-data";
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
  const { cart, clearCart } = useCartStore();
  const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { name: "", email: "", phoneNumber: "", addressLine: "", city: "", state: "", zipcode: "", country: "India" } });

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_SERVER_APP_URL}/api/address`);
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

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("/api/user/data");
  //     const { user } = await res.json();
  //     if (user) form.reset(user);
  //   })();
  // }, []);
  useEffect(() => {
    if (!Array.isArray(cart)) {
      console.log("Resetting corrupted cart state");
      clearCart();
    }
  }, [cart]);




  console.log("is address modal is open, ", open)
  console.log("address is ", address)
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
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
            {["name", "email", "phoneNumber", "addressLine", "zipcode", "city", "state"].map((field) => (
              // @ts-ignore
              <FormField key={field} control={form.control} name={field} render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                  <FormControl><Input placeholder={`Enter ${field.name}`} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            ))}
            <FormField disabled control={form.control} name="country" render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormDescription>Only India is supported currently</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="rounded-md px-4 py-2 text-white" disabled={form.formState.isSubmitting || cart.length === 0}>
              {form.formState.isSubmitting ? <div className="flex gap-2"><span>Loading</span><Loader2 className="animate-spin" /></div> : "Buy Now"}
            </Button>
          </form>
        </Form> */}
        {
          !address &&
          <>
            <span className=" flex ">There is no address in your account.
              </span>
            <span className=" text-blue-700" onClick={() => setOpen(true)}>
              Please add one
            </span>
          <AddressModal open={open} onOpenChange={setOpen} />
          </>
        }
      </div>
    </section>
  );
}
