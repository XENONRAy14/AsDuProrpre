import { Plus, Droplets } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  return (
    <div className="bg-black rounded-2xl shadow-lg overflow-hidden hover:shadow-amber-500/10 transition-all duration-300 group border border-amber-500/20">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-amber-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-amber-500/30">
            <Droplets className="h-3 w-3" />
            {product.category}
          </span>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-red-900/80 text-white px-4 py-2 rounded-lg text-sm font-medium border border-red-500/50">
              Rupture de stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-amber-500 mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors text-lg font-serif">
          {product.name}
        </h3>
        
        <p className="text-amber-100/70 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-amber-500">
              {product.price.toFixed(2)}€
            </span>
            {product.stock > 0 && (
              <span className="text-xs text-amber-400/70">
                En stock: {product.stock}
              </span>
            )}
          </div>
          
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="flex items-center space-x-1 bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md border border-amber-600/50 disabled:border-gray-700"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
}