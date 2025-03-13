import { DeleteIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function CartProductCard({
  product,
  addToCart,
  updateItemQuantity,
  deleteFromCart,
}: {
  addToCart: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  deleteFromCart: (productId: number) => void;
} & { product: { id: number; name: string; image: string; price: number; quantity: number } }) {
  return (
    <Card className="mb-2 flex flex-row p-1">
      <CardContent className="flex w-full flex-row p-0">
        <Link className="min-w-fit" href={`/product/${product.id}`}>
          <Image
            src={product.image}
            width={100}
            height={100}
            alt={product.name}
            priority
            className="rounded-lg"
          />
        </Link>
        <div className="flex flex-col justify-between pl-2 md:pl-4">
          <div>
            <div className="line-clamp-2 text-sm font-medium leading-tight">
              {product.name}
            </div>
            <div className="mt-1 text-sm text-primary opacity-95">
              ₹{product.price}
            </div>
          </div>
          <div className="flex w-min flex-row gap-1 rounded-lg border p-1">
            <Button
              className="h-5 w-5"
              variant="ghost"
              size="icon"
              onClick={() => updateItemQuantity(product.id,product.quantity - 1)}
            >
              <MinusIcon size={15} />
            </Button>
            <span className="min-w-5 px-1 text-center text-sm">
              {product.quantity}
            </span>
            <Button
              className="h-5 w-5"
              variant="ghost"
              size="icon"
              onClick={() => addToCart(product.id)}
            >
              <PlusIcon size={15} />
            </Button>
          </div>
        </div>
        <div className="ml-auto mt-auto pl-2">
          <Button
            className="h-5 w-5"
            variant="destructive"
            size="icon"
            onClick={() => deleteFromCart(product.id)}
          >
            <DeleteIcon size={15} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
