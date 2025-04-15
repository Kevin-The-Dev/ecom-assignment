
import { CheckCircle, Package, X, Home } from "lucide-react";
import { formatIndianRupee } from "@/types";
import { useCart } from "@/context/CartContext";

const ThankYouSection = () => {
  const { state, dispatch } = useCart();
  const { items, isThankYouOpen, orderId, paymentMethod } = state;
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = total + (total > 10000 ? 0 : 199) + Math.round(total * 0.18);
  
  const expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + 5);
  const deliveryDate = expectedDelivery.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleClose = () => {
    dispatch({ type: "RESET_CART" });
  };

  if (!isThankYouOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 bg-purple-600 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Order Confirmed!</h2>
            <button
              onClick={handleClose}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center justify-center mb-8 animate-scale-in">
            <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-center">Thank you for your purchase!</h3>
            <p className="text-gray-600 text-center mt-2">
              Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Order Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date().toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="capitalize">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Delivery:</span>
                    <span>{deliveryDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatIndianRupee(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span>{formatIndianRupee(total > 10000 ? 0 : 199)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span>{formatIndianRupee(Math.round(total * 0.18))}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-purple-600">{formatIndianRupee(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Order Items</h4>
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex p-3 border-b last:border-b-0">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="ml-3 flex-1">
                        <p className="font-medium">{item.title}</p>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span>{formatIndianRupee(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2 mt-6 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors transform active:scale-95"
              >
                <Home className="w-4 h-4" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouSection;
