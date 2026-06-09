import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notfound from '../Notfound';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const Plyer = () => {
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes('movie') ? 'movie' : 'tv';
  const ytvideo = useSelector((state) => state[category].info?.detail?.id);

  return ytvideo ? (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      aria-modal="true"
      aria-label="Stream player"
    >
      <Link
        to={`/${category === 'movie' ? 'movie' : 'tv'}/details/${ytvideo}`}
        className="absolute top-5 right-5 btn btn-icon btn-secondary z-10"
        aria-label="Close player"
      >
        <X className="w-5 h-5" />
      </Link>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-6xl px-4"
      >
        <div className="aspect-video rounded-xl overflow-hidden shadow-card-lg">
          <iframe
            allowFullScreen
            className="w-full h-full"
            src={
              category === 'tv'
                ? `https://vidsrc.cc/v2/embed/tv/${ytvideo}`
                : `https://vidsrc.cc/v2/embed/movie/${ytvideo}`
            }
            title="Stream player"
          />
        </div>
      </motion.div>
    </motion.div>
  ) : (
    <Notfound />
  );
};

export default Plyer;
