import axios from '../../utils/axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, X, Menu, Film, Tv2, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import noimg from '/noimg.jpg';

const MEDIA_ICON = { movie: Film, tv: Tv2, person: User };

export const Topnav = ({ menuhendlaer, menuset }) => {
  const { pathname } = useLocation();
  const [query, setquery] = useState('');
  const [searches, setsearches] = useState([]);
  const [focused, setfocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const Getserches = async () => {
    if (!query.trim()) { setsearches([]); return; }
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results.slice(0, 8));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(Getserches, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setfocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clearSearch = () => { setquery(''); setsearches([]); };
  const showDropdown = focused && (searches.length > 0 || query.trim().length > 0);

  return (
    <div className="flex-1 flex items-center gap-3 px-4 py-3 relative" ref={containerRef}>
      {/* Mobile hamburger — only on home */}
      {pathname === '/' && (
        <button
          onClick={menuhendlaer}
          aria-label="Toggle menu"
          className="sm:flex hidden btn btn-icon btn-ghost text-content-secondary"
        >
          {menuset ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <div
          className={[
            'flex items-center gap-2 bg-surface-overlay border rounded-xl px-3 py-2',
            'transition-all duration-200',
            focused
              ? 'border-brand-500 shadow-glow-sm'
              : 'border-surface-border hover:border-zinc-500',
          ].join(' ')}
        >
          <Search className="w-4 h-4 text-content-tertiary shrink-0" />
          <input
            ref={inputRef}
            onChange={(e) => setquery(e.target.value)}
            onFocus={() => setfocused(true)}
            value={query}
            type="search"
            placeholder="Search movies, shows, people…"
            aria-label="Search"
            className="flex-1 bg-transparent text-sm text-content-primary placeholder-content-tertiary outline-none"
          />
          {query && (
            <button onClick={clearSearch} className="text-content-tertiary hover:text-content-primary transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              key="search-dropdown"
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-[calc(100%+8px)] left-0 w-full z-[200] card shadow-card-lg overflow-hidden"
              style={{ transformOrigin: 'top' }}
            >
              {searches.length > 0 ? (
                <>
                  <div className="px-3 py-2 border-b border-surface-border">
                    <span className="text-2xs font-semibold text-content-disabled uppercase tracking-wider">
                      Results for &ldquo;{query}&rdquo;
                    </span>
                  </div>
                  <ul>
                    {searches.map((s, i) => {
                      const Icon = MEDIA_ICON[s.media_type] || Film;
                      return (
                        <li key={i}>
                          <Link
                            to={`/${s.media_type}/details/${s.id}`}
                            onClick={() => { setfocused(false); clearSearch(); }}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-surface-muted transition-colors duration-150 group"
                          >
                            <div className="w-10 h-14 rounded-md overflow-hidden shrink-0 bg-surface-muted">
                              <img
                                className="w-full h-full object-cover"
                                src={
                                  (s.poster_path || s.backdrop_path || s.profile_path)
                                    ? `https://image.tmdb.org/t/p/w92/${s.poster_path || s.backdrop_path || s.profile_path}`
                                    : noimg
                                }
                                alt=""
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-content-primary truncate">
                                {s.title || s.name || s.original_title || s.original_name}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Icon className="w-3 h-3 text-content-tertiary" />
                                <span className="text-2xs text-content-tertiary capitalize">{s.media_type}</span>
                                {s.release_date && (
                                  <span className="text-2xs text-content-disabled">
                                    · {s.release_date.split('-')[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-content-disabled group-hover:text-content-tertiary transition-colors" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div className="px-4 py-6 text-center">
                  <Search className="w-8 h-8 text-content-disabled mx-auto mb-2" />
                  <p className="text-sm text-content-tertiary">No results for &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
