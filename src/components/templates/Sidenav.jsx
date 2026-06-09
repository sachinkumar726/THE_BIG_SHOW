import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../public/Logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Star,
  Film,
  Tv2,
  Users,
  Monitor,
  LogIn,
  Clapperboard,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/trending',      label: 'Trending',                icon: Flame,       color: 'text-orange-400' },
  { to: '/popular',       label: 'Popular',                 icon: Star,        color: 'text-yellow-400' },
  { to: '/movie',         label: 'Movies',                  icon: Film,        color: 'text-brand-400' },
  { to: '/tv',            label: 'TV Shows',                icon: Tv2,         color: 'text-violet-400' },
  { to: '/person',        label: 'People',                  icon: Users,       color: 'text-emerald-400' },
  { to: '/MovieProvider', label: 'Watch Providers',         icon: Monitor,     color: 'text-sky-400' },
];

export const Sidenav = ({ menuset }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuset && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:block hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={[
          /* desktop: static left column */
          'w-[220px] h-screen bg-surface-overlay border-r border-surface-border',
          'flex flex-col shrink-0 overflow-y-auto',
          /* mobile: fixed overlay, slides in/out */
          'sm:fixed sm:top-0 sm:left-0 sm:z-50 sm:w-[72%]',
          menuset ? 'sm:translate-x-0' : 'sm:-translate-x-full',
          'transition-transform duration-300 ease-in-out',
        ].join(' ')}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-5 border-b border-surface-border shrink-0">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow-sm shrink-0">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm text-content-primary leading-none truncate">
              THE BIG SHOW
            </h1>
            <p className="text-2xs text-content-tertiary mt-0.5">Entertainment Hub</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-2xs font-semibold text-content-disabled uppercase tracking-widest px-3 mb-3">
            Browse
          </p>

          {NAV_ITEMS.map(({ to, label, icon: Icon, color }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'nav-link group relative',
                  isActive ? 'active' : '',
                ].join(' ')}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-400' : color}`} />
                <span className="flex-1 truncate">{label}</span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 text-brand-400 opacity-60" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-surface-border">
            <p className="text-2xs font-semibold text-content-disabled uppercase tracking-widest px-3 mb-3">
              Account
            </p>
            <Link
              to="/login"
              className={`nav-link ${pathname === '/login' ? 'active' : ''}`}
            >
              <LogIn className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="flex-1">Sign In</span>
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-surface-border shrink-0">
          <p className="text-2xs text-content-disabled">
            Made with <span className="text-rose-400">♥</span> by Sachin Kumar
          </p>
        </div>
      </motion.aside>
    </>
  );
};
