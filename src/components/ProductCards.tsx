import { motion } from 'framer-motion';
import { ShoppingCart, Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { products } from '../constants/products';

const ProductCards = () => {
  const { addToCart, cart } = useCart();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    if (!addedItems.includes(product.id)) {
      setAddedItems([...addedItems, product.id]);
      setTimeout(() => {
        setAddedItems(prev => prev.filter(id => id !== product.id));
      }, 2000);
    }
  };

  const isInCart = (id: string) => cart.some(item => item.id === id);

  return (
    <section id="products" className="py-24 px-4 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-2xl shadow-black"
            >
              {/* Product Visual - Monochrome Line Art */}
              <div className="relative aspect-square overflow-hidden bg-black p-12 flex items-center justify-center">
                <img 
                  src={product.lineImage} 
                  alt={product.name}
                  className="w-full h-full object-contain opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                  Sale
                </div>
              </div>

              <div className="p-8 flex flex-col items-center text-center">
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="text-neutral-500 line-through text-sm font-bold">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-white text-2xl font-black tracking-tighter">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="w-full space-y-4">
                   <Link 
                    to={`/product/${product.id}`}
                    className="flex items-center justify-center gap-1.5 w-max mx-auto px-6 py-2 rounded-full bg-zinc-900 border border-white/5 text-white text-xs font-bold hover:bg-zinc-800 transition-colors uppercase"
                  >
                    Details <Plus className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={isInCart(product.id)}
                    className={`w-full py-4 px-6 rounded-full font-black text-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-tighter ${
                      isInCart(product.id) 
                      ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed' 
                      : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {isInCart(product.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        In Cart
                      </>
                    ) : (
                      <>
                        Add to Cart
                        <ShoppingCart className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
