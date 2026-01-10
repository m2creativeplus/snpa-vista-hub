import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  options: Record<string, string>;
}

interface CartStore {
  items: CartItem[];
  ministryId: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setMinistry: (ministryId: string) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      ministryId: null,
      
      addItem: (item) => set((state) => {
        const existingIndex = state.items.findIndex(i => i.productId === item.productId);
        if (existingIndex >= 0) {
          const newItems = [...state.items];
          newItems[existingIndex].quantity += item.quantity;
          return { items: newItems };
        }
        return { items: [...state.items, item] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(i => 
          i.productId === productId ? { ...i, quantity } : i
        )
      })),

      clearCart: () => set({ items: [] }),

      setMinistry: (ministryId) => set({ ministryId }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      }
    }),
    {
      name: 'snpa-cart-storage',
    }
  )
);
