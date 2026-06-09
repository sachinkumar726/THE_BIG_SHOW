import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, CalendarDays, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = ({ data }) => {
  const imgPath = data.backdrop_path || data.poster_path || data.profile_path;
  const title = data.original_title || data.name || data.title || data.original_name;
  const year = (data.release_date || data.first_air_date || '').split('-')[0];
  const mediaType = data.media_type?.toUpperCase();

  return (
    <div
      className="relative w-full h-[62vh] sm:h-[55vh] overflow-hidden"
      aria-label={`Featured: ${title}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${imgPath})`,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative h-full flex flex-col justify-end px-8 pb-10 sm:px-5 sm:pb-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Media type + year badge row */}
        <div className="flex items-center gap-2 mb-3">
          {mediaType && (
            <span className="badge badge-brand text-2xs uppercase tracking-widest">
              {mediaType}
            </span>
          )}
          {year && (
            <span className="badge bg-white/10 text-white/70 border-white/10 text-2xs">
              {year}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3 text-balance">
          {title}
        </h1>

        {/* Overview */}
        <p className="text-sm text-white/70 leading-relaxed line-clamp-2 mb-4 max-w-lg">
          {data.overview}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-5 text-xs text-white/50">
          {(data.release_date || data.first_air_date) && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {data.release_date || data.first_air_date}
            </span>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            to={`/${data.media_type}/details/${data.id}/trailer`}
            className="btn btn-primary btn-md"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Trailer
          </Link>
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="btn btn-secondary btn-md"
          >
            <Info className="w-4 h-4" />
            More Info
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
