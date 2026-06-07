import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Declaration for PayPal SDK
declare global {
  interface Window {
    paypal?: any;
  }
}

const Pricing = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const tiers = [
    {
      id: 'basic',
      name: 'Basic Access',
      price: '49',
      priceId: 'price_basic_id',
      description: 'Perfect for beginners starting their journey.',
      features: [
        'Entry-level vendor list',
        'Direct supplier links',
        'Basic reselling guide',
        'Discord community access',
      ],
      cta: 'Start Now',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro Vendor List',
      price: '99',
      priceId: 'price_pro_id',
      description: 'The sweet spot for serious resellers.',
      features: [
        'Everything in Basic',
        'Expanded 400+ vendor directory',
        'Bulk-pricing access',
        'Winning product lists',
        'Priority support',
      ],
      cta: 'Go Pro',
      popular: true,
    },
    {
      id: 'vip',
      name: 'VIP Mentorship',
      price: '249',
      priceId: 'price_vip_id',
      description: 'Personalized growth for future whales.',
      features: [
        'Everything in Pro',
        '1-on-1 mentorship session',
        'Custom supplier sourcing',
        'Exclusive high-ticket list',
        'Lifetime updates',
      ],
      cta: 'Join VIP',
      popular: false,
    },
  ];

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

  const handleStripeCheckout = async (priceId: string, tierName: string) => {
    setLoading(priceId);
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, tierName }),
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

  // PayPal Button logic
  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      tiers.forEach((tier) => {
        const container = document.getElementById(`paypal-button-${tier.id}`);
        if (container && container.innerHTML === '') {
          window.paypal.Buttons({
            createOrder: (_data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  description: tier.name,
                  amount: {
                    currency_code: 'USD',
                    value: tier.price
                  }
                }]
              });
            },
            onApprove: async (data: any, _actions: any) => {
              const response = await fetch('http://localhost:5000/api/verify-paypal-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID, tierName: tier.name })
              });
              const orderData = await response.json();
              if (orderData.status === 'COMPLETED') {
                window.location.href = '/success';
              }
            }
          }).render(`#paypal-button-${tier.id}`);
        }
      });
    }
  }, [paypalLoaded]);

  return (
    <section id="pricing" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Invest in Your <span className="text-primary">Future</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your ambition. One-time payment for instant lifetime access.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-panel p-8 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:scale-[1.02] ${
                tier.popular ? 'neon-border border-primary/50' : 'border-white/5'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star size={16} fill="white" /> MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$</span>
                <span className="text-6xl font-bold text-white tracking-tight">{tier.price}</span>
                <span className="text-gray-400">/one-time</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-0.5 rounded-full">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => handleStripeCheckout(tier.priceId, tier.name)}
                  disabled={loading !== null}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center ${
                    tier.popular 
                      ? 'bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  } ${loading === tier.priceId ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading === tier.priceId ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : tier.cta}
                </button>

                <div className="text-center text-xs text-gray-500 uppercase tracking-widest font-bold">
                  OR PAY WITH PAYPAL
                </div>
                
                <div id={`paypal-button-${tier.id}`} className="min-h-[45px]">
                  {!paypalLoaded && (
                    <div className="bg-white/5 animate-pulse h-[45px] rounded-xl"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
