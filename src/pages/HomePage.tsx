import { useState, useEffect, useCallback } from 'react';
import { Search, Droplets, Sparkles, Filter } from 'lucide-react';
import ProductGrid from '../components/Product/ProductGrid';
import { Product } from '../types';
import { productService } from '../services/productService';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.searchProducts(searchQuery, selectedCategory);
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Hero Section */}
      <div className="relative bg-black rounded-3xl overflow-hidden mb-12 shadow-xl border border-amber-500/30">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617957743103-310accdeac9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80')] opacity-20 bg-cover bg-center"></div>
          <Droplets className="absolute top-10 left-10 h-64 w-64 text-amber-500/20" />
          <Sparkles className="absolute bottom-10 right-10 h-48 w-48 text-amber-500/20" />
        </div>
        <div className="relative py-20 px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-500 font-serif">
            L'As du Propre
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-amber-100/90">
            Produits d'entretien luxueux et efficaces
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-amber-200/70">
            Livraison à Marseille et alentours • Paiement à la livraison
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-amber-500 text-black px-8 py-4 rounded-lg font-medium hover:bg-amber-400 transition-colors shadow-lg border border-amber-600/50">
              Découvrir nos produits
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 bg-black rounded-2xl shadow-lg p-8 border border-amber-500/20">
        <h2 className="text-xl font-semibold text-amber-500 mb-6 font-serif">Rechercher des produits</h2>
        <div className="space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-amber-500/30 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-amber-100 placeholder-amber-200/50"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-amber-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-900 border border-amber-500/30 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-amber-100"
            >
              <option value="all">Toutes catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div id="products">
        <h2 className="text-2xl font-bold text-amber-500 mb-8 font-serif">Nos produits de luxe</h2>
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
}