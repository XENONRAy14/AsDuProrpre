import { Product } from '../../types';
import ProductCard from './ProductCard';
import { PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-black rounded-2xl shadow-lg overflow-hidden animate-pulse border border-amber-500/10">
            <div className="h-48 bg-gray-900"></div>
            <div className="p-5">
              <div className="h-5 bg-gray-800 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-800 rounded mb-4 w-full"></div>
              <div className="flex justify-between items-center">
                <div className="h-7 bg-gray-800 rounded w-16"></div>
                <div className="h-9 bg-amber-900/30 rounded-lg w-24 border border-amber-500/10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-black rounded-2xl shadow-lg p-10 border border-amber-500/20">
        <PackageSearch className="h-16 w-16 mx-auto text-amber-500 mb-4 opacity-80" />
        <div className="text-amber-500 text-xl font-medium mb-3 font-serif">Aucun produit trouvé</div>
        <p className="text-amber-100/70 max-w-md mx-auto">Essayez de modifier vos critères de recherche ou explorez d'autres catégories</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}