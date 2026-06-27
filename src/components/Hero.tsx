import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
              Premium Supplier Network
            </span>
          </div>

          <h1 className="text-6xl md:text-[6.5rem] font-black tracking-tighter mb-8 leading-[0.9]">
            START <span className="text-neutral-600">RESELLING</span><br />
            <span className="text-white">SMARTER.</span>
          </h1>
          
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12 font-bold uppercase tracking-tight">
            Instant Access to Hand-Vetted Factory Sources. 
            Skip the Vetting. Go Straight to Profit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToProducts}
              className="group relative bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-2xl hover:bg-neutral-200 active:scale-95 flex items-center gap-2"
            >
              Access Directory
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={scrollToProducts}
              className="px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all hover:bg-white/5 border border-white/10 active:scale-95 text-white"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-12"
        >
          {[
            { label: 'Active Users', value: '5k+' },
            { label: 'Verified Vendors', value: '450+' },
            { label: 'Market Access', value: 'Instant' },
            { label: 'Success Rate', value: '94%' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.2em] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
