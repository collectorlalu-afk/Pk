import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Cart = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckout] = useState(false);

  const handleCheckout = async () => {
    setIsCheckout(true);
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price
          })),
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout session');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect to server');
    } finally {
      setIsCheckout(null as any);
      setIsCheckout(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white tracking-tight">Your Cart</h2>
                <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-neutral-400" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag className="w-8 h-8 text-neutral-600" />
                  </div>
                  <p className="text-neutral-400 font-medium">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-white font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                        <p className="text-neutral-500 text-sm">Instant Digital Access</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">${item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-neutral-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-white">${totalPrice}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Checkout Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-neutral-500 text-xs mt-4">
                  Secure encrypted checkout via Stripe & PayPal
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
