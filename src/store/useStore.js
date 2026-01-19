import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: async() => {
    set({user: null});
    await AsyncStorage.removeItem("user");

  },

  cart: [],
  // Add new product or update existing
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find(item => item.id === product.id);

      let newCart;

      if (existing) {
        newCart = state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: product.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, product];
      }

      // Save the updated cart to AsyncStorage
      AsyncStorage.setItem("cart", JSON.stringify(newCart)).catch(err =>
        console.error("Failed to save cart to AsyncStorage:", err)
      );

      return { cart: newCart };
    }),

  setCart: (cart) => set({ cart: cart }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter(item => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  location: {},
  setLocation: (location) => set({ location }),
  clearLocation: () => set({ location: {} }),
}));

export default useStore;
