
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Product, formatIndianRupee } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps extends Product {}

const ProductCard = ({ id, title, price, image }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product: { id, title, price, image }, quantity }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-purple-600 font-bold mb-4">{formatIndianRupee(price)}</p>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={decrementQuantity}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors active:scale-95 transform"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-gray-700 font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors active:scale-95 transform"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-all duration-300 transform active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
