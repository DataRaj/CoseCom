"use client";
import { notFound, useParams, useRouter } from "next/navigation";
// import { useAppContext } from "@/context/AppContext";

import ProductsCard from "@/components/store/product-card-store";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/app-data";
import { useSession } from "@/lib/auth-client";
import useCartStore from "@/store/useStore";
import { Euro, HeartHandshake, Minus, Plus, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  const { data: session } = useSession();

  // console.log(`here is an user data: `, user.getUserId())
  // console.log('here is a session ', session?.user.id)

  // const { addToCart, updateItemQuantity } = useAppContext();
  const { addToCart, updateItemQuantity } = useCartStore.getState();
  const { productName } = useParams();
  const product = products.find((p) => p.route === productName);
  const randomNumber = Math.floor(Math.random() * 3);
  const router = useRouter();
  if (!product) return notFound();

  return (
    <>
      <main className="max-w-5xl mx-auto py-6 px-6">
        <nav className="text-foreground/60 text-sm mb-6">
          <Link
            href="/"
            className="hover:text-foreground transition-colors duration-300"
          >
            Home
          </Link>{" "}
          /{" "}
          <Link
            href="/products"
            className="hover:text-foreground transition-colors duration-300"
          >
            Products
          </Link>{" "}
          /
          <span className="text-foreground">
            {" "}
            {product.name} {product.category}
          </span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold ">
              {product.name} {product.category}
            </h1>
            <div className="flex items-center mt-3">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="ml-1  text-lg">{product.rating}</span>
              <span className="ml-2 text-foreground/80 text-sm">
                ({Math.floor(product.price * 1.5)} reviews)
              </span>
            </div>
            <p className="text-2xl font-semibold mt-4">${product.price}</p>
            <p className="mt-4 text-foreground/70">{product.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/80 text-black text-sm rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex w-full items-center gap-4 mt-12">
              <div className="flex items-center border border-white/40 rounded-xl px-4 py-2.5">
                <button
                  className="text-foreground/60 hover:text-foreground"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  className="w-10 md:w-24 text-center text-lg font-semibold bg-transparent outline-none"
                  value={quantity}
                  min="1"
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                />
                <button
                  className="text-foreground/60 hover:text-foreground"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={() => {
                 if( !session) router.push('/auth/sign-in')
                   else {
                  addToCart(product.id);
                  updateItemQuantity(product.id, quantity);
                  // console.log('added to cart ' + product.name)


                   }
                }}
                className="rounded-xl py-6 w-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>

      <section className="flex flex-col md:flex-row gap-14 w-full justify-around items-center py-12 sm:py-24">
        <div className="flex flex-col justify-center text-center items-center max-w-80">
          <Truck strokeWidth={1} className="size-20" />
          <h3 className="text-3xl my-2">Free shipping</h3>
          <p>Enjoy the convenience of free shipment on all your orders.</p>
        </div>
        <div className="flex flex-col justify-center text-center items-center max-w-80">
          <HeartHandshake strokeWidth={1} className="size-20" />
          <h3 className="text-3xl my-2">Easy refund</h3>
          <p>Shop with confidence that our easy refund policy has got.</p>
        </div>
        <div className="flex flex-col justify-center text-center items-center max-w-80">
          <Euro strokeWidth={1} className="size-20" />
          <h3 className="text-3xl my-2">Flexible payment</h3>
          <p>We understand that flexibility is key to payments.</p>
        </div>
      </section>

      <section className="py-12 sm:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-light text-foreground mb-3">
            Recent products
          </h2>
          <p className="sm:text-lg text-foreground/60">
            Ethically sourced rare oils, carefully selected for their
            extraordinary benefits
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 justify-center">
          {products
            .filter((i) => product.id !== i.id)
            .slice(randomNumber, randomNumber + 3)
            .map((product) => (
              <Link key={product.route} href={`/products/${product.route}`}>
                <ProductsCard
                  image={product.image}
                  price={product.price}
                  category={product.category}
                  name={product.name}
                />
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
