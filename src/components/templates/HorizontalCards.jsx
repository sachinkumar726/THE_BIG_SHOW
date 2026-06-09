import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Tv2, Film, LayoutGrid } from 'lucide-react';
import noimg from '/noimg.jpg';

function HorizontalCards({ data }) {
  const { pathname } = useLocation();

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-content-disabled">
        <LayoutGrid className="w-10 h-10 mb-3 opacity-40" />
        <p className="text-sm">Nothing to show here</p>
      </div>
    );
  }

  return (
    <div className="scroll-strip py-4">
      {data.map((d, i) => {
        const imgSrc = (d.poster_path || d.backdrop_path || d.profile_path)
          ? `https://image.tmdb.org/t/p/w342/${d.poster_path || d.backdrop_path || d.profile_path}`
          : noimg;
        const name = d.title || d.original_title || d.name || d.original_name;
        const score = d.vote_average > 0 ? (d.vote_average * 10).toFixed(0) : null;
        const to = d.season_number !== undefined
          ? `${pathname}/season/${d.season_number}`
          : `/${d.media_type === 'movie' ? 'movie' : 'tv'}/details/${d.id}`;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3, ease: 'easeOut' }}
            className="flex-shrink-0 w-[180px] sm:w-[140px]"
          >
            <Link to={to} className="group block" aria-label={name}>
              <div className="relative rounded-xl overflow-hidden bg-surface-muted aspect-[2/3] mb-2.5 shadow-card">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={imgSrc}
                  alt={name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {score && (
                  <div
                    className={[
                      'absolute bottom-2 left-2 w-8 h-8 rounded-full flex items-center justify-center',
                      'text-xs font-bold text-white border-2 shadow-md',
                      parseInt(score) >= 70
                        ? 'bg-emerald-500/90 border-emerald-400'
                        : parseInt(score) >= 50
                        ? 'bg-accent-gold/90 border-yellow-400'
                        : 'bg-rose-500/90 border-rose-400',
                    ].join(' ')}
                  >
                    {score}
                  </div>
                )}

                {d.season_number !== undefined && (
                  <div className="absolute top-2 right-2">
                    <span className="badge bg-brand-600/80 text-white border-brand-500/50 text-2xs backdrop-blur-sm">
                      S{d.season_number}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs font-medium text-content-secondary group-hover:text-content-primary transition-colors line-clamp-2 leading-snug px-0.5">
                {name}
              </p>
              {d.overview && (
                <p className="text-2xs text-content-disabled line-clamp-2 mt-0.5 px-0.5 leading-relaxed">
                  {d.overview.slice(0, 60)}…
                </p>
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default HorizontalCards;
