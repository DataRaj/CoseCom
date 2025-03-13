import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  quantity: number;
};

export type CartState = {
  cart: CartItem[];
};

export type CartActions = {
  addToCart: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const useCartStore = create(
  persist<CartState & CartActions>(
    (set) => ({
      cart: [],

      addToCart: (productId) => {
        set((state) => {
          // Prevent accidental duplicate insertion
          if (state.cart.some((item) => item.productId === productId)) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { productId, quantity: 1 }],
          };
        });
      },

      updateItemQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
