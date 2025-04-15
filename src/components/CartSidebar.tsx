
import { X, CreditCard } from "lucide-react";
import CartItem from "./CartItem";
import { formatIndianRupee } from "@/types";
import { useCart } from "@/context/CartContext";

const CartSidebar = () => {
  const { state, dispatch } = useCart();
  const { items, isCartOpen } = state;
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClose = () => {
    dispatch({ type: "SET_CART_OPEN", payload: false });
  };

  const handleProceedToPayment = () => {
    dispatch({ type: "SET_CART_OPEN", payload: false });
    dispatch({ type: "SET_PAYMENT_OPEN", payload: true });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Your Shopping Cart</h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-center mb-4">Your cart is empty</p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                />
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-lg">Total:</span>
                <span className="font-bold text-purple-600 text-lg">
                  {formatIndianRupee(total)}
                </span>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors transform active:scale-95"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
