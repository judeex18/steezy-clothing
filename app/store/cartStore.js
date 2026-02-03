import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product, size) => {
    set((state) => {
      const existing = state.cart.find(
        (item) => item.id === product.id && item.size === size,
      );
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        cart: [...state.cart, { ...product, size, quantity: 1 }],
      };
    });
  },

  removeFromCart: (id, size) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === id && item.size === size),
      ),
    }));
  },

  updateQuantity: (id, size, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id, size);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  getTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
}));
