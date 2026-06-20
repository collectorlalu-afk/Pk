import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      user: 'Alex D.',
      role: 'Shopify Seller',
      text: 'The Pro list is a goldmine. I found three vendors for my niche in 10 minutes that actually responded and had great prices.',
      rating: 5,
    },
    {
      user: 'Sarah M.',
      role: 'Amazon FBA',
      text: 'PK Sells saved me weeks of research. The verification process they do is legit. Highly recommended for anyone starting out.',
      rating: 5,
    },
    {
      user: 'Kevin L.',
      role: 'eBay PowerSeller',
      text: 'VIP mentorship was worth every penny. Having a direct line to someone who knows the game changed my scaling strategy.',
      rating: 5,
    },
    {
      user: 'Elena R.',
      role: 'Dropshipper',
      text: 'Winning product lists are updated weekly and the data is spot on. My conversion rates have doubled since using their suggestions.',
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Hear from the <span className="text-primary">Community</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join thousands of successful resellers who found their edge with PK Sells.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 rounded-3xl border border-white/5"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6">"{review.text}"</p>
              <div>
                <div className="text-white font-bold">{review.user}</div>
                <div className="text-primary text-sm font-medium">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
