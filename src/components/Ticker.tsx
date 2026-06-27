import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Shield, CheckCircle, Users, BookOpen } from 'lucide-react';

const messages = [
  { text: 'Highest quality guaranteed', icon: CheckCircle },
  { text: 'Private suppliers not found anywhere else', icon: Shield },
  { text: 'Used By Over 500+ Resellers', icon: Users },
  { text: 'Free Guide Included', icon: BookOpen },
];

export default function Ticker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const Icon = messages[index].icon;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black border-b border-white/10 py-2.5 overflow-hidden h-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-neutral-400"
        >
          <Icon className="w-3.5 h-3.5 text-white" />
          <span>{messages[index].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
