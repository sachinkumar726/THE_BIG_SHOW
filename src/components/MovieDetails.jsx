import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from './store/actions/movieActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from './templates/HorizontalCards';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ExternalLink, Globe, Film, Play, Home,
  Star, Clock, CalendarDays, Languages, AlertCircle,
} from 'lucide-react';

const ScoreBadge = ({ score }) => {
  const pct = (score * 10).toFixed(0);
  const color =
    parseInt(pct) >= 70
      ? '#10b981'
      : parseInt(pct) >= 50
      ? '#f59e0b'
      : '#f43f5e';
  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm text-white border-4 shadow-lg"
      style={{ borderColor: color, background: `${color}22` }}
      title={`${pct}% user score`}
    >
      {pct}
      <sup className="text-2xs">%</sup>
    </div>
  );
};

const WatchProviderRow = ({ label, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold text-content-tertiary whitespace-nowrap min-w-[120px]">
        {label}
      </span>
      <div className="flex gap-2 flex-wrap">
        {items.map((w, i) => (
          <img
            key={i}
            title={w.provider_name}
            className="provider-logo"
            src={`https://image.tmdb.org/t/p/w92/${w.logo_path}`}
            alt={w.provider_name}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => { dispatch(removemovie()); };
  }, [id]);

  if (!info) return <Loading />;

  const { detail, externalid, recommendations, similar, translations, watchproviders } = info;
  const title = detail.title || detail.original_title || detail.name || detail.original_name;
  const year = detail.release_date?.split('-')[0];
  const genres = detail.genres?.map((g) => g.name).join(' · ') || '';
  const runtime = detail.runtime ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m` : null;

  return (
    <div className="relative min-h-screen bg-surface-base text-content-primary overflow-x-hidden">
      {/* Blurred hero backdrop */}
      <div
        className="absolute inset-0 h-[65vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path || detail.poster_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-surface-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-base via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Nav bar */}
        <nav className="flex items-center gap-4 px-6 py-4" aria-label="Detail navigation">
          <Link to="/movie" aria-label="Back to movies" className="btn btn-icon btn-ghost">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" aria-label="Home" className="btn btn-icon btn-ghost">
              <Home className="w-4 h-4" />
            </Link>
            {detail.homepage && (
              <Link target="_blank" rel="noopener noreferrer" to={detail.homepage} className="btn btn-icon btn-ghost" aria-label="Official website">
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            {externalid.wikidata_id && (
              <Link target="_blank" rel="noopener noreferrer" to={`https://www.wikidata.org/wiki/${externalid.wikidata_id}`} className="btn btn-icon btn-ghost" aria-label="Wikidata">
                <Globe className="w-4 h-4" />
              </Link>
            )}
            {externalid.imdb_id && (
              <Link
                target="_blank" rel="noopener noreferrer"
                to={`https://www.imdb.com/title/${externalid.imdb_id}/`}
                className="btn btn-secondary btn-sm text-xs font-bold"
                aria-label="IMDb page"
              >
                IMDb
              </Link>
            )}
          </div>
        </nav>

        {/* Main content */}
        <div className="px-6 pb-16 sm:px-4">
          <div className="flex gap-8 sm:flex-col sm:gap-5 items-start max-w-5xl">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="shrink-0"
            >
              <div className="w-48 sm:w-36 rounded-2xl overflow-hidden shadow-card-lg border border-white/10">
                <img
                  className="w-full object-cover"
                  src={`https://image.tmdb.org/t/p/w342/${detail.poster_path || detail.backdrop_path}`}
                  alt={title}
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              className="flex-1 min-w-0 pt-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Title row */}
              <div className="flex items-start gap-4 flex-wrap mb-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-4xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    {title}
                    {year && (
                      <span className="text-xl sm:text-base font-semibold text-content-tertiary ml-2">
                        ({year})
                      </span>
                    )}
                  </h1>
                  {detail.tagline && (
                    <p className="text-sm italic text-content-tertiary mt-1">{detail.tagline}</p>
                  )}
                </div>
                {detail.vote_average > 0 && <ScoreBadge score={detail.vote_average} />}
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-content-secondary">
                {detail.release_date && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-content-tertiary" />
                    {detail.release_date}
                  </span>
                )}
                {runtime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-content-tertiary" />
                    {runtime}
                  </span>
                )}
                {genres && (
                  <span className="flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-content-tertiary" />
                    {genres}
                  </span>
                )}
              </div>

              {/* Overview */}
              <h2 className="text-sm font-bold text-content-secondary uppercase tracking-widest mb-2">Overview</h2>
              <p className="text-sm text-content-secondary leading-relaxed mb-6 max-w-2xl">
                {detail.overview}
              </p>

              {/* Available languages */}
              {translations && translations.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-content-secondary uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5" />
                    Available In
                  </h2>
                  <p className="text-xs text-content-tertiary leading-relaxed max-w-2xl">
                    {translations.join(' · ')}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mb-2">
                <Link to={`${pathname}/trailer`} className="btn btn-primary btn-md">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Trailer
                </Link>
                <Link to={`${pathname}/player`} className="btn btn-secondary btn-md">
                  <Play className="w-4 h-4" />
                  Stream Link 1
                </Link>
                <Link to={`${pathname}/playertwo`} className="btn btn-secondary btn-md">
                  <Play className="w-4 h-4" />
                  Stream Link 2
                </Link>
              </div>

              {/* DNS Note */}
              <p className="flex items-center gap-1.5 text-xs text-amber-500 mt-3">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                If a stream link doesn't work, try connecting via{' '}
                <a
                  href="https://1.1.1.1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-amber-400 transition-colors"
                >
                  Cloudflare DNS
                </a>
              </p>
            </motion.div>
          </div>

          {/* Watch Providers */}
          {watchproviders && (
            <motion.section
              className="mt-8 max-w-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="section-title mb-4">Where to Watch</h2>
              <div className="card p-4 space-y-3">
                <WatchProviderRow label="Stream"    items={watchproviders.flatrate} />
                <WatchProviderRow label="Rent"      items={watchproviders.rent}     />
                <WatchProviderRow label="Buy"       items={watchproviders.buy}      />
                {!watchproviders.flatrate && !watchproviders.rent && !watchproviders.buy && (
                  <p className="text-sm text-content-tertiary">
                    No streaming data available for your region.
                  </p>
                )}
              </div>
            </motion.section>
          )}

          {/* Recommendations */}
          <motion.section
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="section-title mb-4">You Might Also Like</h2>
            <HorizontalCards
              data={recommendations && recommendations.length > 0 ? recommendations : similar || []}
            />
          </motion.section>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
