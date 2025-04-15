
import { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  isPaymentOpen: boolean;
  isThankYouOpen: boolean;
  orderId: string | null;
  paymentMethod: "razorpay" | "googlepay" | "upi" | null;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "SET_PAYMENT_OPEN"; payload: boolean }
  | { type: "SET_THANK_YOU_OPEN"; payload: boolean }
  | { type: "SET_PAYMENT_METHOD"; payload: "razorpay" | "googlepay" | "upi" }
  | { type: "COMPLETE_ORDER" }
  | { type: "RESET_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast(`Updated quantity for ${product.title}`);
      } else {
        updatedItems = [...state.items, { ...product, quantity }];
        toast(`Added ${product.title} to cart`);
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      
      if (quantity === 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case "REMOVE_FROM_CART": {
      const { id } = action.payload;
      const itemToRemove = state.items.find(item => item.id === id);
      
      if (itemToRemove) {
        toast(`Removed ${itemToRemove.title} from cart`);
      }
      
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }
    case "SET_CART_OPEN":
      return {
        ...state,
        isCartOpen: action.payload,
      };
    case "SET_PAYMENT_OPEN":
      return {
        ...state,
        isPaymentOpen: action.payload,
      };
    case "SET_THANK_YOU_OPEN":
      return {
        ...state,
        isThankYouOpen: action.payload,
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case "COMPLETE_ORDER":
      return {
        ...state,
        orderId: `KS${Math.floor(100000 + Math.random() * 900000)}`,
        isPaymentOpen: false,
        isThankYouOpen: true,
      };
    case "RESET_CART":
      return {
        ...state,
        items: [],
        isCartOpen: false,
        isPaymentOpen: false,
        isThankYouOpen: false,
        orderId: null,
        paymentMethod: null,
      };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  isCartOpen: false,
  isPaymentOpen: false,
  isThankYouOpen: false,
  orderId: null,
  paymentMethod: null,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
