
import { useState } from "react";
import { X, CreditCard, ArrowRight, QrCode } from "lucide-react";
import { formatIndianRupee } from "@/types";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const PaymentSection = () => {
  const { state, dispatch } = useCart();
  const { items, isPaymentOpen } = state;
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "googlepay" | "upi" | null>(null);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + 5);
  const deliveryDate = expectedDelivery.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleClose = () => {
    dispatch({ type: "SET_PAYMENT_OPEN", payload: false });
  };

  const handleSelectPaymentMethod = (method: "razorpay" | "googlepay" | "upi") => {
    setPaymentMethod(method);
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method });
  };

  const handleCompletePayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    toast.success("Payment Successful!");
    dispatch({ type: "COMPLETE_ORDER" });
  };

  if (!isPaymentOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Payment Method</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="space-y-6">
            <h3 className="font-semibold text-lg border-b pb-2">Select Payment Method</h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleSelectPaymentMethod("razorpay")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  paymentMethod === "razorpay"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <CreditCard className={`w-6 h-6 ${
                  paymentMethod === "razorpay" ? "text-purple-600" : "text-gray-400"
                }`} />
                <span className="font-medium">Razorpay</span>
              </button>

              <button
                onClick={() => handleSelectPaymentMethod("googlepay")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  paymentMethod === "googlepay"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-6 h-6 ${
                    paymentMethod === "googlepay" ? "text-purple-600" : "text-gray-400"
                  }`}
                  fill="currentColor"
                >
                  <path d="M5.4 15.3h.7c.5 0 .9-.3.9-.7s-.4-.7-.9-.7h-.7v1.4zm.7-2.4h.7c.4 0 .7-.2.7-.6s-.3-.6-.7-.6h-.7v1.2zM8.2 17H6V9.9h2.2c1.3 0 2.1.7 2.1 1.7 0 .7-.5 1.2-1 1.4.7.2 1.2.8 1.2 1.5 0 1.1-.9 1.5-2.3 1.5zM12.2 17h-1.3V9.9h1.3V17zM13.8 17l-2-7.1h1.4l1.4 5.6 1.4-5.6h1.4l-2 7.1h-1.6zM12.6 8.1V6h10.3v2.1z"/>
                </svg>
                <span className="font-medium">Google Pay</span>
              </button>

              <button
                onClick={() => handleSelectPaymentMethod("upi")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  paymentMethod === "upi"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <QrCode className={`w-6 h-6 ${
                  paymentMethod === "upi" ? "text-purple-600" : "text-gray-400"
                }`} />
                <span className="font-medium">UPI Payment</span>
              </button>
            </div>

            {paymentMethod === "upi" && (
              <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Scan with any UPI app to pay</p>
                <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
                  <QrCode className="w-32 h-32 mx-auto text-black" />
                </div>
                <p className="text-xs text-gray-500">UPI ID: kevinshop@ybl</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Order Summary</h3>
            <div className="max-h-64 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-sm border-b">
                  <div className="flex gap-2">
                    <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">{formatIndianRupee(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatIndianRupee(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{formatIndianRupee(total > 10000 ? 0 : 199)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>{formatIndianRupee(Math.round(total * 0.18))}</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-purple-600">
                {formatIndianRupee(total + (total > 10000 ? 0 : 199) + Math.round(total * 0.18))}
              </span>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>Estimated delivery: {deliveryDate}</p>
            </div>
            
            <button
              onClick={handleCompletePayment}
              disabled={!paymentMethod}
              className="w-full flex items-center justify-center gap-2 mt-6 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95"
            >
              Complete Payment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
