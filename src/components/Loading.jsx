import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

const Loading = () => {
  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-surface-base"
      role="status"
      aria-label="Loading content"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center shadow-glow">
          <Clapperboard className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-brand-500"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-content-tertiary">Loading…</p>
    </div>
  );
};

export default Loading;
export { Loading };
