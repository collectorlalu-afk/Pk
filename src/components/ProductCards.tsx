import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Declaration for PayPal SDK
declare global {
  interface Window {
    paypal?: any;
  }
}

const products = [
  {
    id: 'electronics',
    name: 'Electronic Vendor',
    description: 'High-quality supplier access for premium electronic products, gadgets, and specialized components.',
    price: '49',
    priceId: 'price_electronics_id',
    image: './electronics-vendor.png',
  },
  {
    id: 'clothing',
    name: 'Clothing Vendor',
    description: 'Direct access to verified clothing suppliers for latest fashion trends, streetwear, and luxury apparel.',
    price: '39',
    priceId: 'price_clothing_id',
    image: './clothing-vendor.png',
  },
  {
    id: 'perfume',
    name: 'Perfume Vendor',
    description: 'Exclusive supplier links for high-end designer fragrances and rare niche perfume houses.',
    price: '45',
    priceId: 'price_perfume_id',
    image: './perfume-vendor.png',
  },
  {
    id: 'moissanite',
    name: 'Moissanite Vendor',
    description: 'Direct sourcing for premium moissanite gemstones and high-end jewelry manufacturing suppliers.',
    price: '59',
    priceId: 'price_moissanite_id',
    image: './moissanite-vendor.png',
  }
];

const ProductCards = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  // Load PayPal SDK
  useEffect(() => {
    if (window.paypal) {
      setPaypalLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD`;
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Render PayPal Buttons
  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      products.forEach((product) => {
        const container = document.getElementById(`paypal-button-${product.id}`);
        if (container && container.innerHTML === '') {
          window.paypal.Buttons({
            style: {
              layout: 'horizontal',
              color: 'white',
              shape: 'pill',
              label: 'paypal',
              height: 40,
              tagline: false
            },
            createOrder: (_data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  description: product.name,
                  amount: {
                    currency_code: 'USD',
                    value: product.price
                  }
                }]
              });
            },
            onApprove: async (data: any, _actions: any) => {
              const response = await fetch('http://localhost:5000/api/verify-paypal-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID, tierName: product.name })
              });
              const orderData = await response.json();
              if (orderData.status === 'COMPLETED') {
                window.location.href = '/success';
              }
            }
          }).render(`#paypal-button-${product.id}`);
        }
      });
    }
  }, [paypalLoaded]);

  const handleCheckout = async (priceId: string, productName: string) => {
    setLoading(priceId);
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, tierName: productName }),
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
      setLoading(null);
    }
  };

  return (
    <section className="py-24 px-4 bg-black overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Premium Directories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
          >
            Vault <span className="text-neutral-600">Access</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Instant entry to the most exclusive supplier networks. Professional sourcing for high-margin reselling.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -12 }}
              className="group relative flex flex-col h-full rounded-[2.5rem] overflow-hidden"
            >
              {/* Card Container with luxury border and subtle glow */}
              <div className="absolute inset-0 bg-[#0a0a0a] border border-white/5 group-hover:border-white/20 transition-colors duration-500 rounded-[2.5rem]" />
              
              {/* Inner animated glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem] overflow-hidden">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-white/10 via-transparent to-transparent animate-pulse" />
              </div>

              {/* Top Image Preview with mask */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700 ease-out grayscale brightness-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
              </div>

              <div className="relative z-10 p-8 pt-2 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                  {product.description}
                </p>

                <div className="mt-auto space-y-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-neutral-500 font-bold">$</span>
                    <span className="text-4xl font-bold text-white tracking-tighter">{product.price}</span>
                    <span className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.2em]">one-time</span>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => handleCheckout(product.priceId, product.name)}
                      disabled={loading !== null}
                      className="w-full bg-white text-black hover:bg-neutral-200 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      {loading === product.priceId ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Access Vendor
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div id={`paypal-button-${product.id}`} className="min-h-[40px] opacity-80 hover:opacity-100 transition-opacity">
                      {!paypalLoaded && (
                        <div className="bg-white/5 animate-pulse h-[40px] rounded-full"></div>
                      )}
                    </div>
                  </div>
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
