
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatIndianRupee } from "@/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem = ({
  id,
  title,
  price,
  quantity,
  image,
}: CartItemProps) => {
  const { dispatch } = useCart();
  
  const handleUpdateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity }
    });
  };
  
  const handleRemove = () => {
    dispatch({ 
      type: "REMOVE_FROM_CART", 
      payload: { id } 
    });
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 animate-fade-in">
      <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="text-purple-600 font-bold mt-1">{formatIndianRupee(price)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleUpdateQuantity(Math.max(0, quantity - 1))}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors transform active:scale-95"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm text-gray-600">{quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors transform active:scale-95"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={handleRemove}
            className="ml-auto p-1 text-red-500 hover:text-red-600 transition-colors transform active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
