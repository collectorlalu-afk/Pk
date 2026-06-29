import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToProducts = () => {
    if (location.pathname !== '/') {
      navigate('/#products');
      return;
    }
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-10 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
              <img src="vault-logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-white tracking-tighter uppercase">PK</span>
              <span className="text-xl font-black text-white/40 tracking-tighter uppercase leading-[0.5]">Sells</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToProducts}
              className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors hidden sm:block"
            >
              Directory
            </button>
            <Link
              to="/contact"
              className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors hidden sm:block"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 relative shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline uppercase tracking-widest text-[10px]">Cart</span>
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
