"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
// import { useAppContext } from "@/context/AppContext";
import { products } from "@/lib/app-data";
import useCartStore from "@/store/useStore";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CardButton() {
  // const { cart, removeFromCart, updateItemQuantity } = useAppContext();
  const { cart, removeFromCart, updateItemQuantity } = useCartStore()
  // const [checkoutClick, setCheckoutClick] = useState("Continue to Checkout");
  const router = useRouter()
  const handleCheckout = () => {

    router.push('/cart')
  }



  // console.log(cart.length)
  // console.log("here are cart items ", cart.map((item) => products.find((p) => p.id === item.productId)))
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative group p-1">
          <ShoppingBag className="text-primary" strokeWidth={1} />
          <p className="absolute size-4 rounded-xl flex justify-center items-center bg-primary right-0 top-1 group-hover:size-8 transition-all duration-300">
            <span className="text-xs group-hover:text-lg text-background transition-all duration-300">
              {cart.length}
            </span>
          </p>
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-start">Your Cart</SheetTitle>
        </SheetHeader>

        {cart.length ? (
          <>
            <div className="my-4 flex flex-col justify-start items-center gap-4">
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null; // ✅ Skip if product is not found

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 items-center p-2 w-full rounded-xl"
                  >
                    <div className="min-h-20 min-w-20 size-20 rounded-lg bg-slate-500 overflow-clip">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>

                    <div className="flex w-full flex-col justify-start items-start">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-lg">{product.name}</span>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1 border border-white/40 rounded-xl"
                        >
                          <X strokeWidth={1} className="size-5" />
                        </button>
                      </div>

                      <span className="opacity-80">
                        ${product.price * item.quantity} USD
                      </span>

                      <div className="flex justify-between gap-2 mt-1 w-full items-center">
                        <div className="flex items-center border border-white/40 rounded-xl px-2 py-0.5">
                          <button
                            className="text-foreground/60 hover:text-foreground"
                            onClick={() =>
                              updateItemQuantity(product.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="size-4" />
                          </button>

                          <input
                            type="number"
                            className="w-8 sm:w-12 text-center bg-transparent outline-none"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                              updateItemQuantity(
                                product.id,
                                Number(e.target.value)
                              )
                            }
                          />

                          <button
                            className="text-foreground/60 hover:text-foreground"
                            onClick={() =>
                              updateItemQuantity(product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto border-t-2 py-4 w-full flex flex-col gap-4 items-center justify-between">
              <p className="flex justify-between w-full text-lg text-foreground/80">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)} USD</span>
              </p>

              <Button
                type="submit"
                className={`w-full ${

                  "bg-gray-200 hover:bg-gray-400"
                }`}
                onClick={() => handleCheckout()}
              >
                Click to Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-8 justify-center items-center h-full">
            <span>No items added to your basket</span>
            <SheetClose asChild>
              <Link href={"/products"}>
                <Button type="submit">Start Shopping</Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
