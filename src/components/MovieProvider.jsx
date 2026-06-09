import React, { useEffect, useState } from 'react';
import { Topnav } from './templates/Topnav';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Dropdown } from './templates/Dropdown';
import Loading from './Loading';
import { motion } from 'framer-motion';
import { Monitor, ArrowLeft, Globe } from 'lucide-react';

const MovieProvider = () => {
  const navigate = useNavigate();
  const [getProviders, setgetProviders] = useState([]);
  const [regions, setregions] = useState([]);
  const [selectregion, setselectregion] = useState('IN');

  const getMovieProviders = async () => {
    try {
      const { data } = await axios.get(
        `/watch/providers/movie?language=en-US&watch_region=${selectregion}`
      );
      setgetProviders(data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getregions = async () => {
    try {
      const { data } = await axios.get('/watch/providers/regions');
      setregions(data.results.map((e) => e.iso_3166_1));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getregions();
    getMovieProviders();
  }, [selectregion]);

  return (
    <div className="min-h-screen bg-surface-base text-content-primary">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-surface-base/90 backdrop-blur-md border-b border-surface-border">
        <div className="flex items-center gap-3 px-4 py-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-icon btn-ghost"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-sky-500/15 flex items-center justify-center">
              <Monitor className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-content-primary leading-none">Watch Providers</h1>
              <p className="text-2xs text-content-disabled mt-0.5">Region: {selectregion}</p>
            </div>
          </div>

          <Topnav />

          <div className="flex items-center gap-2 shrink-0 pr-2">
            <Globe className="w-4 h-4 text-content-tertiary" />
            <Dropdown
              title="Region"
              options={regions}
              func={(e) => setselectregion(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Provider grid */}
      {getProviders.length === 0 ? (
        <Loading />
      ) : (
        <motion.div
          className="p-6 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-content-tertiary mb-6">
            {getProviders.length} providers available in{' '}
            <span className="text-content-secondary font-semibold">{selectregion}</span>
          </p>

          <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-5">
            {getProviders.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.25 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-surface-border bg-surface-muted shadow-card transition-all duration-300 group-hover:border-brand-500/50 group-hover:shadow-glow-sm group-hover:-translate-y-1">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w92/${d.logo_path}`}
                    alt={d.provider_name}
                    loading="lazy"
                    title={d.provider_name}
                  />
                </div>
                <p className="text-2xs text-center text-content-tertiary group-hover:text-content-secondary transition-colors leading-snug max-w-[80px]">
                  {d.provider_name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MovieProvider;
