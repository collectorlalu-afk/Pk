import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <span className="text-black font-black text-xl">PK</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-white tracking-tighter uppercase">Sells</span>
              <span className="text-[8px] text-neutral-500 font-bold tracking-[0.3em] uppercase">Verified</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToProducts}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block"
            >
              Browse Directory
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-white/20">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
