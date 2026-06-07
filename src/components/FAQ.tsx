import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I access the vault after purchase?',
      answer: 'Immediately after checkout, you will receive an email with your login credentials to our secure dashboard where you can download all lists and guides.',
    },
    {
      question: 'Are these vendors still active in 2024?',
      answer: 'Yes! We update our directory monthly. We remove inactive suppliers and add new verified ones to ensure you always have the best links.',
    },
    {
      question: 'Do I need a business license to use these vendors?',
      answer: 'Most vendors in our directory work with both individuals and registered businesses. Some premium bulk suppliers may require a resale certificate for tax exemption.',
    },
    {
      question: 'What is the refund policy?',
      answer: 'Due to the digital nature of our products and instant access to proprietary vendor information, all sales are final. We guarantee the quality of our links.',
    },
    {
      question: 'How much starting capital do I need?',
      answer: 'Our directory includes vendors with No Minimum Order Quantity (MOQ) for beginners, as well as bulk suppliers for those ready to invest $500+.',
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Common <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know before joining the vault.
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
    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-bold text-lg">{faq.question}</span>
        {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-8 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
