import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  cart: [],
  loading: false,
  error: null,

  loadCartFromBackend: async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/cart/${userId}`
      );
      set({ cart: response.data });
    } catch (error) {
      set({ error: "Failed to load cart", loading: false });
    }
  },

  addToCart: async (product, userId) => {
    try {
      set((state) => {
        const productExists = state.cart.find(
          (item) => item.productId === product.id
        );
        if (productExists) {
          return {
            cart: state.cart.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      });

      await axios.post("http://localhost:8000/api/user/cart", {
        userId,
        productId: product._id,
        quantity: 1,
      });
    } catch (error) {
      set({ error: "Failed to add to cart" });
    }
  },

  removeFromCart: async (productId, userId) => {
    try {
      set((state) => ({
        cart: state.cart.filter((item) => item.productId !== productId),
      }));

      await axios.delete(`http://localhost:8000/api/user/cart/${productId}`, {
        params: { userId },
      });
    } catch (error) {
      set({ error: "Failed to remove from cart" });
    }
  },

  updateQuantity: async (productId, newQuantity, userId) => {
    try {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      }));

      await axios.put("http://localhost:8000/api/user/cart", {
        userId,
        productId,
        quantity: newQuantity,
      });
    } catch (error) {
      set({ error: "Failed to update quantity" });
    }
  },
}));

export default useStore;
