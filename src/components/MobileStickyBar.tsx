import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const MobileStickyBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <button
            onClick={scrollToProducts}
            className="w-full bg-white text-black py-4 px-6 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
            View All Vendors
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyBar;
