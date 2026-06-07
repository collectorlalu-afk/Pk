import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with Grid and Glow */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#0a0a0a]"></div>
      
      {/* Animated Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
            Trusted by 5,000+ Resellers
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Start Reselling <span className="text-gradient">Smarter.</span><br />
            <span className="text-white">Get Access Instantly.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Skip the guesswork. Access our hand-vetted directory of suppliers, cheap bulk pricing, and winning product lists today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center gap-2">
              Get Access Now
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass-panel text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:bg-white/5 border border-white/10">
              View Pricing
            </button>
          </div>
        </motion.div>

        {/* Mockup Preview / Stats Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="relative glass-panel p-2 rounded-[2.5rem] overflow-hidden max-w-4xl mx-auto neon-border">
            <img 
              src="/hero-bg.png" 
              alt="Dashboard Preview" 
              className="w-full h-auto rounded-[2rem] opacity-80"
            />
            {/* Overlay features */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 w-full">
                  {[
                    { label: 'Verified Vendors', value: '450+' },
                    { label: 'Winning Products', value: '1.2k' },
                    { label: 'Success Rate', value: '94%' },
                    { label: 'Avg. Profit', value: '$2.5k+' }
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel p-4 rounded-2xl text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
