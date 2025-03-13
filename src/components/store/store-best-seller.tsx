"use client";

import useCartStore from "@/store/useStore";
import { CircleCheckBig, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BestSeller() {
  // const { addToCart, removeFromCart } = useAppContext();
  const { addToCart, removeFromCart } = useCartStore()
  const [click, setClick] = useState(true);
  return (
    <section
      id="client-favorites"
      className="py-12 sm:py-24 max-w-screen-lg mx-auto px-4"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-light text-foreground mb-3">
          Client Favorites
        </h2>
        <p className="sm:text-lg text-foreground/60">
          Our signature formulations that have earned global recognition
        </p>
      </div>
      <div className="w-full relative flex flex-col md:flex-row gap-10 items-center justify-center md:h-64 bg-muted dark:bg-[#F8F8F8] rounded-xl p-2">
        <Image
          src="/best.png"
          alt="Eternal Youth Serum"
          width={600}
          height={763}
          className="absolute left-1/5 md:left-10 lg:left-16 -top-12 md:-top-16 h-60 md:h-80 w-auto"
        />

        <div className="mt-52 md:mt-0 md:ml-48 flex flex-col justify-center text-center md:text-start md:justify-start">
          <h3 className="text-3xl md:text-5xl font-semibold text-black mb-2">
            Eternal Youth
          </h3>
          <p className="text-black leading-6 text-lg mb-6 max-w-[380px]">
            A luxury serum enriched with vitamins C and E to restore your
            skin&apos;s natural glow.
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                addToCart(1);
                setClick(false);
              }}
              className="py-2.5 w-full text-white flex items-center justify-center gap-2 hover:bg-black/80 transition-colors duration-300 px-8 bg-black rounded-lg font-medium"
            >
              {click ? (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - 139$
                </>
              ) : (
                <>
                  <CircleCheckBig className="mr-2 h-5 w-5" />
                  Added to Cart
                </>
              )}
            </button>
            {!click && (
              <button
                onClick={() => {
                  setClick(true);
                  removeFromCart(1);
                }}
                className="py-3 flex items-center justify-center hover:bg-black/80 transition-colors duration-300 px-4 bg-black rounded-lg font-medium"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
