import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Star, ArrowLeft, ShieldCheck, Zap, Globe, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../constants/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, cart } = useCart();

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <Link to="/" className="text-neutral-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image/Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden luxury-border bg-neutral-950">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center">
                  <ShieldCheck className="w-8 h-8 text-white mb-3" />
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Verified</span>
                  <span className="text-sm font-medium mt-1">Direct Sources</span>
               </div>
               <div className="glass-panel p-6 rounded-3xl flex flex-col items-center text-center">
                  <Zap className="w-8 h-8 text-white mb-3" />
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Instant</span>
                  <span className="text-sm font-medium mt-1">Digital Access</span>
               </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
               <span className="inline-block px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
                Premium Directory
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">{product.name}</h1>
              <div className="flex items-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-white" fill="currentColor" />
                ))}
                <span className="ml-2 text-neutral-500 font-medium">(24 Verified Reviews)</span>
              </div>
            </div>

            <p className="text-xl text-neutral-400 leading-relaxed mb-10 font-medium">
              {product.longDescription}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mb-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-white" />
                What's Included
              </h3>
              <ul className="space-y-4">
                {product.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-neutral-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-6">
               <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-neutral-500">$</span>
                  <span className="text-6xl font-black text-white tracking-tighter">{product.price}</span>
                  <span className="text-sm text-neutral-600 font-black uppercase tracking-[0.2em]">one-time access</span>
               </div>

               <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`w-full py-6 rounded-2xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] ${
                  isInCart 
                  ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-6 h-6" />
                    In Your Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-widest">
                  <Globe className="w-4 h-4" /> Global Access
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-widest">
                  <Clock className="w-4 h-4" /> 24/7 Support
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <section className="mt-32 pt-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Customer Experience</h2>
            <p className="text-neutral-500 font-medium">Real results from professional resellers using this directory.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {product.reviews.map((review, index) => (
              <div key={index} className="glass-panel p-10 rounded-[2.5rem] border border-white/5">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-white" fill="currentColor" />
                  ))}
                </div>
                <p className="text-xl text-neutral-300 italic mb-8 font-medium">"{review.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/10">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{review.user}</div>
                    <div className="text-neutral-500 text-sm font-bold uppercase tracking-widest">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <Cart />
    </div>
  );
};

export default ProductDetail;
