
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({
  id,
  title,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="text-purple-600 font-bold mt-1">${price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(id, Math.max(0, quantity - 1))}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm text-gray-600">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, quantity + 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => onRemove(id)}
            className="ml-auto p-1 text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
