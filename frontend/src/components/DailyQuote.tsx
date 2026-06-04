import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './ui';

const quotes = [
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.",
  "Success is the product of daily habits—not once-in-a-lifetime transformations.",
  "The secret of your future is hidden in your daily routine."
];

export default function DailyQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Pick a quote based on the day of the year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="mb-10 p-5 bg-gradient-to-r from-[#D4AF37]/5 to-[#F3E5AB]/5 border-white/5 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/10 transition-colors"></div>
        <div className="flex gap-4 items-start relative z-10">
          <div className="p-2 bg-[#D4AF37]/10 rounded-lg text-[#D4AF37]">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-gray-300 italic font-serif text-lg leading-relaxed">"{quote}"</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
