
import { ShoppingCart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import PaymentSection from "@/components/PaymentSection";
import ThankYouSection from "@/components/ThankYouSection";
import Footer from "@/components/Footer";
import { sampleProducts } from "@/data/sampleProducts";
import { useCart } from "@/context/CartContext";
import { Toaster } from "sonner";

const Index = () => {
  const { state, dispatch } = useCart();
  const { items, isCartOpen } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Welcome to Kevin's Shop</h1>
          <button
            onClick={() => dispatch({ type: "SET_CART_OPEN", payload: true })}
            className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Payment Section */}
      <PaymentSection />
      
      {/* Thank You Section */}
      <ThankYouSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
