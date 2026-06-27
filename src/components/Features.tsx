import { ShieldCheck, Zap, TrendingUp, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: 'Verified Suppliers',
      description: 'Every vendor in our directory is hand-vetted for quality, reliability, and shipping speed.',
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
    },
    {
      title: 'Cheap Bulk Pricing',
      description: 'Unlock direct factory rates and exclusive bulk discounts you won\'t find anywhere else.',
      icon: <Zap className="w-8 h-8 text-white" />,
    },
    {
      title: 'Winning Product Lists',
      description: 'Get weekly updates on high-demand, low-competition products ready to sell.',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
    },
    {
      title: 'Step-by-Step Guide',
      description: 'From zero to profit. Our comprehensive guide walks you through the entire process.',
      icon: <BookOpen className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
            Built for <span className="text-neutral-600">Scale</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg font-bold uppercase tracking-tight">
            Professional infrastructure for the modern reseller.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] p-10 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">{feature.title}</h3>
              <p className="text-neutral-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
