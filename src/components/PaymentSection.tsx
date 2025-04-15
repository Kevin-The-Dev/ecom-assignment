
import { useState } from "react";
import { CreditCard } from "lucide-react";
import { CartItem } from "../types";

interface PaymentSectionProps {
  items: CartItem[];
  onClose: () => void;
}

const PaymentSection = ({ items, onClose }: PaymentSectionProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
          
          <div className="space-y-4 mb-6">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border ${
                paymentMethod === "card"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <CreditCard className={`w-6 h-6 ${
                paymentMethod === "card" ? "text-purple-600" : "text-gray-400"
              }`} />
              <span className="font-medium">Credit Card</span>
            </button>

            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border ${
                paymentMethod === "paypal"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className={`w-6 h-6 ${
                  paymentMethod === "paypal" ? "text-purple-600" : "text-gray-400"
                }`}
                fill="currentColor"
              >
                <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/>
              </svg>
              <span className="font-medium">PayPal</span>
            </button>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span className="text-purple-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors">
              Confirm Payment
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
