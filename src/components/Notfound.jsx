import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, VideoOff } from 'lucide-react';

const Notfound = () => {
  const Navigate = useNavigate();
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      aria-modal="true"
      aria-label="Content not found"
    >
      <Link
        onClick={() => Navigate(-1)}
        className="absolute top-5 right-5 btn btn-icon btn-secondary"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </Link>

      <motion.div
        className="text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-20 h-20 rounded-3xl bg-surface-raised border border-surface-border flex items-center justify-center mx-auto mb-6">
          <VideoOff className="w-10 h-10 text-content-disabled" />
        </div>
        <h2 className="text-2xl font-black text-content-primary mb-2">Content unavailable</h2>
        <p className="text-sm text-content-tertiary max-w-xs">
          The trailer or stream for this title isn't available right now. Try again later.
        </p>
        <button
          onClick={() => Navigate(-1)}
          className="btn btn-secondary btn-md mt-6"
        >
          Go Back
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Notfound;
