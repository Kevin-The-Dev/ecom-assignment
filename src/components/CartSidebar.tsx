
import { X, CreditCard } from "lucide-react";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
  onProceedToPayment: () => void;
}

const CartSidebar = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onProceedToPayment,
}: CartSidebarProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-white transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-purple-600">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onProceedToPayment}
              disabled={items.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
