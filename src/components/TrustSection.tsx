import { ShieldCheck, Zap, Headphones } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-16 bg-neutral-950 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Instant Delivery</h3>
            <p className="text-muted-foreground text-sm">
              Get access to your vendor links immediately after purchase.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-muted-foreground text-sm">
              Protected by Stripe and PayPal. Your data is 100% safe.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-muted-foreground text-sm">
              Our team is always here to help you with your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
