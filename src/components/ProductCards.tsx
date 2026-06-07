import { motion } from 'framer-motion';
import { Smartphone, Shirt, Droplet, Gem, ArrowRight } from 'lucide-react';
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
    description: 'High-quality supplier access for premium electronic products and gadgets.',
    price: '49',
    priceId: 'price_electronics_id',
    icon: <Smartphone className="w-8 h-8" />,
  },
  {
    id: 'clothing',
    name: 'Clothing Vendor',
    description: 'Direct access to verified clothing suppliers for latest fashion trends.',
    price: '39',
    priceId: 'price_clothing_id',
    icon: <Shirt className="w-8 h-8" />,
  },
  {
    id: 'perfume',
    name: 'Perfume Vendor',
    description: 'Exclusive supplier links for high-end designer and niche perfumes.',
    price: '45',
    priceId: 'price_perfume_id',
    icon: <Droplet className="w-8 h-8" />,
  },
  {
    id: 'moissanite',
    name: 'Moissanite Vendor',
    description: 'Direct sourcing for premium moissanite and high-end jewelry suppliers.',
    price: '59',
    priceId: 'price_moissanite_id',
    icon: <Gem className="w-8 h-8" />,
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
    <section className="py-24 px-4 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Vendor <span className="text-neutral-500">Vault</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium"
          >
            Premium supplier access for elite resellers. Secure your competitive edge with verified sources.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col h-full transition-all duration-500 shadow-2xl hover:border-white/20"
            >
              <div className="mb-8">
                <div className="mb-6 p-4 bg-white/5 rounded-3xl w-fit group-hover:bg-white/10 transition-colors duration-300 border border-white/5">
                  {product.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed min-h-[4rem]">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">${product.price}</span>
                  <span className="text-neutral-600 text-sm font-bold uppercase tracking-wider">USD</span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleCheckout(product.priceId, product.name)}
                    disabled={loading !== null}
                    className="w-full bg-white text-black hover:bg-neutral-200 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95"
                  >
                    {loading === product.priceId ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Get Access
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div id={`paypal-button-${product.id}`} className="min-h-[40px]">
                    {!paypalLoaded && (
                      <div className="bg-white/5 animate-pulse h-[40px] rounded-full"></div>
                    )}
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
