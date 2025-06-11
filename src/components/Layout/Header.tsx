import { Sparkles, ShoppingCart, Home, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { itemCount } = useCart();
  const location = useLocation();
  
  return (
    <header className="bg-black sticky top-0 z-50 shadow-lg border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Sparkles className="h-8 w-8 text-amber-500" />
            <span className="text-2xl font-bold text-amber-500 tracking-tight font-serif">L'As du Propre</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                location.pathname === '/' ? 'text-amber-400' : 'text-amber-500/80'
              }`}
            >
              <span className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Produits</span>
              </span>
            </Link>
            
            <Link 
              to="/admin" 
              className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-amber-400 ${
                location.pathname === '/admin' ? 'text-amber-400' : 'text-amber-500/80'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center space-x-1 bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors font-medium shadow-md"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Panier</span>
              {itemCount > 0 && (
                <span className="bg-black text-amber-400 px-2 py-0.5 rounded-full text-xs font-bold ml-1">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}