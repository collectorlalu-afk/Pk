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
      question: 'Are these vendors verified for 2024?',
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
    <section id="faq" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked <span className="text-muted">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Quick answers to help you get started.
          </p>
        </div>

        <div className="space-y-4">
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
    <div className="border-b border-neutral-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 text-left flex justify-between items-center group"
      >
        <span className="text-white font-medium text-lg group-hover:text-neutral-300 transition-colors">
          {faq.question}
        </span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Plus className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-muted-foreground leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
