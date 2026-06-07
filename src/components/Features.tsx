import { ShieldCheck, Zap, TrendingUp, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: 'Verified Suppliers',
      description: 'Every vendor in our vault is hand-vetted for quality, reliability, and shipping speed.',
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Cheap Bulk Pricing',
      description: 'Unlock direct factory rates and exclusive bulk discounts you won\'t find anywhere else.',
      icon: <Zap className="w-10 h-10 text-accent-blue" />,
    },
    {
      title: 'Winning Product Lists',
      description: 'Get weekly updates on high-demand, low-competition products ready to sell.',
      icon: <TrendingUp className="w-10 h-10 text-accent-green" />,
    },
    {
      title: 'Step-by-Step Guide',
      description: 'From zero to profit. Our comprehensive guide walks you through the entire process.',
      icon: <BookOpen className="w-10 h-10 text-accent-purple" />,
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to <span className="text-primary">Scale</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide the infrastructure. You provide the hustle. Here's what's inside the vault.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 group neon-border"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
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
