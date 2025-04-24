import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],

  addToCart: (product) => {
    set((state) => {
      const productExists = state.cart.find((item) => item.id === product.id);

      if (productExists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId, newQuantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ),
    }));
  },

  getTotalPrice: () => {
    set((state) => ({
      totalPrice: state.cart.reduce(
        (acc, item) =>
          acc +
          (Number(item.price) * Number(item.quantity) -
            Number(item.discount) * Number(item.quantity) +
            Number(item.deliveryCharge)),
        0
      ),
    }));
  },

  persistCartToLocalStorage: () => {
    set((state) => {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    });
  },

  loadCartFromLocalStorage: () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      set({ cart: JSON.parse(storedCart) });
    }
  },
}));

export default useStore;
