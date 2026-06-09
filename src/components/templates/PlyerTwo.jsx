import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Notfound from '../Notfound';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const PlyerTwo = () => {
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
      aria-label="Stream player 2"
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
            src={`https://embed.smashystream.com/playere.php?tmdb=${ytvideo}`}
            title="Stream player 2"
          />
        </div>
      </motion.div>
    </motion.div>
  ) : (
    <Notfound />
  );
};

export default PlyerTwo;
