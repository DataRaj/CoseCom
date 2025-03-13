import { products } from "@/lib/app-data";
import ProductsCard from "@/components/store/product-card-store";
import Link from "next/link";

export default function Products() {
  return (
    <section
      id="our-collection"
      className="py-12 sm:py-24 max-w-screen-md mx-auto"
    >
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-light text-foreground mb-3">
          Our Collection
        </h2>
        <p className="sm:text-lg text-foreground/60">
          Each product is a masterpiece of luxury skincare innovation
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center w-full rounded-xl p-2">
        {products.map((product) => (
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
  );
}
