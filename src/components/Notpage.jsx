import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Clapperboard } from 'lucide-react';

const Notpage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-surface-base flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-600/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-3xl bg-surface-raised border border-surface-border flex items-center justify-center mx-auto mb-8 shadow-card">
          <Clapperboard className="w-10 h-10 text-content-disabled" />
        </div>

        <div className="text-[10rem] sm:text-[6rem] font-black text-surface-border leading-none mb-4 select-none">
          404
        </div>

        <h1 className="text-2xl font-black text-content-primary mb-2">Page not found</h1>
        <p className="text-sm text-content-tertiary max-w-sm mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link to="/" className="btn btn-primary btn-md">
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Notpage;
