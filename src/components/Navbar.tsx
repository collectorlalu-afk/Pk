import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
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
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-white tracking-tighter">VendorVault</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToProducts}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block"
            >
              Browse Vendors
            </button>
            <button
              onClick={scrollToProducts}
              className="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Get Access</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
