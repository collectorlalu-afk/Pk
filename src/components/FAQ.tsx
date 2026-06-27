import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I access the vendor links after purchase?',
      answer: 'Immediately after checkout, you will receive an automated email with direct access to your purchased vendor links and instructions.',
    },
    {
      question: 'Are these vendors verified for 2026?',
      answer: 'Yes. Our team manually verifies every supplier to ensure they are active, reliable, and offering competitive pricing.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'Due to the digital nature of our products and instant access to proprietary information, all sales are final. We stand by the quality of our sources.',
    },
    {
      question: 'Do these vendors ship internationally?',
      answer: 'Most of our listed vendors offer worldwide shipping. Some electronics and moissanite suppliers ship directly from their manufacturing hubs to you or your customer.',
    }
  ];

  return (
    <section id="faq" className="py-32 bg-black border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
            Common <span className="text-neutral-600">Questions</span>
          </h2>
          <p className="text-neutral-500 font-bold uppercase tracking-tight">
            Clear answers for professional resellers.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 text-left flex justify-between items-center group"
      >
        <span className="text-white font-black text-xs uppercase tracking-[0.2em] group-hover:text-neutral-400 transition-colors">
          {faq.question}
        </span>
        <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all">
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-white" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-neutral-500 font-medium leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
