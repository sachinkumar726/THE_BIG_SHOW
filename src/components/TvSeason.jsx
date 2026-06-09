import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Loading from './Loading';
import noimg from '/noimg.jpg';
import { motion } from 'framer-motion';
import { X, Star, CalendarDays, ListVideo, Play } from 'lucide-react';

const TvSeason = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const series_id = pathname.split('/')[3];

  const [details, setdetails] = useState(null);

  const Getdetails = async () => {
    try {
      const { data } = await axios.get(`/tv/${series_id}/season/${id}`);
      setdetails(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => { Getdetails(); }, []);

  if (!details) return <Loading />;

  const series = pathname.split('/')[3];

  return (
    <div
      className="relative min-h-screen bg-surface-base text-content-primary overflow-x-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-surface-base/92 backdrop-blur-sm" />

      <div className="relative z-10 p-6 sm:p-4">
        {/* Close button */}
        <Link
          to={`/tv/details/${series}`}
          className="absolute top-5 right-5 btn btn-icon btn-secondary"
          aria-label="Close season view"
        >
          <X className="w-4 h-4" />
        </Link>

        {/* Season header */}
        <motion.div
          className="flex gap-6 sm:gap-4 sm:flex-col mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-40 sm:w-28 shrink-0 rounded-2xl overflow-hidden shadow-card-lg border border-surface-border">
            <img
              className="w-full object-cover"
              src={
                details.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${details.poster_path}`
                  : noimg
              }
              alt={details.name}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-2xl font-black text-white mb-3">{details.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-content-secondary mb-4">
              {details.vote_average > 0 && (
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400" />
                  {details.vote_average.toFixed(1)}
                </span>
              )}
              {details.air_date && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-content-tertiary" />
                  {details.air_date}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <ListVideo className="w-3.5 h-3.5 text-content-tertiary" />
                {details.episodes.length} Episodes
              </span>
            </div>
            {details.overview && (
              <p className="text-sm text-content-secondary leading-relaxed max-w-2xl">
                {details.overview}
              </p>
            )}
          </div>
        </motion.div>

        {/* Episodes grid */}
        <h2 className="section-title mb-4">Episodes</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
          {details.episodes.map((ep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="flex-shrink-0 w-56 sm:w-44"
            >
              <Link
                to={`${pathname}/episode/${ep.episode_number}`}
                className="group block card card-hover overflow-hidden"
                aria-label={`Play Episode ${ep.episode_number}: ${ep.name}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-surface-muted">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={
                      ep.still_path
                        ? `https://image.tmdb.org/t/p/w300/${ep.still_path}`
                        : noimg
                    }
                    alt={ep.name}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <div className="w-10 h-10 rounded-full bg-brand-600/90 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="badge bg-black/70 text-white border-white/10 text-2xs backdrop-blur-sm">
                      Ep {ep.episode_number}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-sm font-semibold text-content-secondary group-hover:text-content-primary transition-colors line-clamp-2">
                    {ep.name}
                  </p>
                  {ep.air_date && (
                    <p className="text-2xs text-content-disabled mt-1">{ep.air_date}</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-xs text-amber-500 mt-6">
          Connect via{' '}
          <a href="https://1.1.1.1/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-400">
            Cloudflare DNS
          </a>
          {' '}if a stream link doesn't work.
        </p>

        <Outlet />
      </div>
    </div>
  );
};

export default TvSeason;
