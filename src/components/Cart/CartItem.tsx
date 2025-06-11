import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.price.toFixed(2)}€ / unité</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-lg text-blue-600">
          {(item.price * item.quantity).toFixed(2)}€
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors mt-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}