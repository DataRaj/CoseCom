/** eslint-disable @typescript-eslint/no-explicit-any */
import CartProductCard from "@/components/cart/CartProductCard";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { products } from "@/lib/app-data";
import useCartStore from "@/store/useStore";
import { useEffect, useState } from "react";

export default function CartOrderTable() {
  const { cart, removeFromCart, addToCart, updateItemQuantity } = useCartStore();
  const [time, setTime] = useState(5);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (time === 0) {
    window.location.href = "/";
  }
  useEffect(() => {
    if (cart.length === 0){
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
    }

  }, [time]);


  if (!hydrated) return null;
  const cartProducts = cart
    .map(({ productId, quantity }) => {
      const product = products.find(({ id }) => id === productId);
      return product ? { id: product.id,name: product.name, image: product.image, price: product.price, route: product.route, quantity } : null;
    })
    .filter(Boolean) as { id: number, name: string; image: string; price: number; route:string; quantity: number }[];

  const subtotal = cartProducts.reduce((total, { price, quantity }) => total + price * quantity, 0);
  // console.log(cart.length)

  return (
    <div className="py-2">
      <h1 className="p-2 text-left text-2xl font-bold">Cart</h1>
      {cart.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2 lg:grid-cols-4">
            {cart.map(({ productId, quantity }, index) => {
              const product = cartProducts.find(({ id }) => id === productId);
              return product ? (
                <CartProductCard
                  key={index}
                  product={product}
                  updateItemQuantity={updateItemQuantity}
                  addToCart={addToCart}
                  deleteFromCart={removeFromCart}
                />
              ) : null;
            })}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h2 className="p-2 text-xl font-medium">Order Summary</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DESCRIPTION</TableHead>
                  <TableHead className="text-right">UNIT PRICE</TableHead>
                  <TableHead className="text-right">QTY</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartProducts.map(({ name, price, quantity }, index) => (
                  <TableRow key={index}>
                    <TableCell>{name}</TableCell>
                    <TableCell className="text-right">₹{price}</TableCell>
                    <TableCell className="text-right">{quantity}</TableCell>
                    <TableCell className="text-right">₹{price * quantity}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>Subtotal</TableCell>
                  <TableCell className="text-right">₹{subtotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Shipping Cost</TableCell>
                  <TableCell className="text-right">FREE</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow className="text-primary">
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">₹{subtotal}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      ) : (

        <>
        <span className="p-2">Empty Cart</span>
        <span className="p-2">redirecting to Home page in {time}</span>

        </>
      )}
    </div>
  );
}
