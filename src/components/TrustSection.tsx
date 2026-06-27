import { ShieldCheck, Zap, Headphones } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-24 bg-[#050505] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-white/20 transition-all duration-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Instant Fulfillment</h3>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-tight max-w-[200px]">
              Access your directory immediately post-checkout.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-white/20 transition-all duration-500">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Secure Checkout</h3>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-tight max-w-[200px]">
              Encrypted payments via Stripe & PayPal.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-white/20 transition-all duration-500">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Elite Support</h3>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-tight max-w-[200px]">
              Direct assistance for your reselling journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
