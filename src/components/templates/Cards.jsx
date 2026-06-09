import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Film, Tv2, User } from 'lucide-react';
import noimg from '/noimg.jpg';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const TYPE_ICON = { movie: Film, tv: Tv2, person: User };

export const Cards = ({ data, title }) => {
  return (
    <motion.div
      className="w-full grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-4 p-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {data.map((c, i) => {
        const mediaType = c.media_type || title;
        const TypeIcon = TYPE_ICON[mediaType] || Film;
        const imgSrc = (c.poster_path || c.backdrop_path || c.profile_path)
          ? `https://image.tmdb.org/t/p/w342/${c.poster_path || c.backdrop_path || c.profile_path}`
          : noimg;
        const name = c.title || c.original_title || c.name || c.original_name;
        const score = c.vote_average > 0 ? (c.vote_average * 10).toFixed(0) : null;

        return (
          <motion.div key={i} variants={itemVariants}>
            <Link
              to={`/${mediaType}/details/${c.id}`}
              className="group block"
              aria-label={name}
            >
              {/* Poster */}
              <div className="relative rounded-xl overflow-hidden bg-surface-muted aspect-[2/3] mb-3 shadow-card">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={imgSrc}
                  alt={name}
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Score badge */}
                {score && (
                  <div
                    className={[
                      'absolute bottom-2 left-2 w-9 h-9 rounded-full flex items-center justify-center',
                      'text-xs font-bold text-white border-2 shadow-lg',
                      parseInt(score) >= 70
                        ? 'bg-emerald-500/90 border-emerald-400'
                        : parseInt(score) >= 50
                        ? 'bg-accent-gold/90 border-yellow-400'
                        : 'bg-rose-500/90 border-rose-400',
                    ].join(' ')}
                    title={`${score}% user score`}
                  >
                    {score}
                  </div>
                )}

                {/* Media type chip */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="badge bg-black/70 text-white/80 border-white/10 backdrop-blur-sm">
                    <TypeIcon className="w-3 h-3" />
                    <span className="capitalize text-2xs">{mediaType}</span>
                  </span>
                </div>
              </div>

              {/* Title */}
              <p className="text-sm font-medium text-content-secondary group-hover:text-content-primary transition-colors duration-200 line-clamp-2 leading-snug px-0.5">
                {name}
              </p>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
