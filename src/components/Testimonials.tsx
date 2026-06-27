import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      user: 'Alex D.',
      role: 'Shopify Seller',
      text: 'The directory is a goldmine. I found three vendors for my niche in 10 minutes that actually responded and had great prices.',
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
      text: 'The jewelry vendors here are top-notch. My conversion rates have doubled since I switched to these sources.',
      rating: 5,
    },
    {
      user: 'Elena R.',
      role: 'Dropshipper',
      text: 'Winning product lists are updated weekly and the data is spot on. Finding authentic wholesalers is usually a nightmare, but this made it easy.',
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
            Reseller <span className="text-neutral-600">Success</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg font-bold uppercase tracking-tight">
            Join the elite network of professional resellers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-white" fill="currentColor" />
                ))}
              </div>
              <p className="text-xl text-neutral-300 italic mb-10 font-medium leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-black text-white border border-white/10">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold uppercase tracking-tighter">{review.user}</div>
                  <div className="text-neutral-500 text-xs font-black uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
