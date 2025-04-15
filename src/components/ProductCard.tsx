
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  onAddToCart: (id: number, quantity: number) => void;
}

const ProductCard = ({ id, title, price, image, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-purple-600 font-bold mb-4">${price.toFixed(2)}</p>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={decrementQuantity}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-gray-700 font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onAddToCart(id, quantity)}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
