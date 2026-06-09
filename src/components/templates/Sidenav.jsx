import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Star, Film, Tv2, Users, Monitor, LogIn, Clapperboard,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/trending',      label: 'Trending',        icon: Flame,    color: 'text-orange-400',  activeBg: 'bg-orange-500/15'  },
  { to: '/popular',       label: 'Popular',         icon: Star,     color: 'text-yellow-400',  activeBg: 'bg-yellow-500/15'  },
  { to: '/movie',         label: 'Movies',          icon: Film,     color: 'text-brand-400',   activeBg: 'bg-brand-500/15'   },
  { to: '/tv',            label: 'TV Shows',        icon: Tv2,      color: 'text-violet-400',  activeBg: 'bg-violet-500/15'  },
  { to: '/person',        label: 'People',          icon: Users,    color: 'text-emerald-400', activeBg: 'bg-emerald-500/15' },
  { to: '/MovieProvider', label: 'Providers',       icon: Monitor,  color: 'text-sky-400',     activeBg: 'bg-sky-500/15'     },
];

/* ─── Tooltip wrapper ─── */
const NavItem = ({ to, label, icon: Icon, color, activeBg, isActive }) => (
  <Link
    to={to}
    aria-label={label}
    aria-current={isActive ? 'page' : undefined}
    className="group relative flex items-center justify-center"
  >
    {/* Active pill indicator */}
    {isActive && (
      <motion.div
        layoutId="active-pill"
        className="absolute inset-0 rounded-xl"
        style={{ background: 'rgba(99,102,241,0.15)' }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      />
    )}

    {/* Icon button */}
    <div
      className={[
        'relative z-10 w-10 h-10 rounded-xl flex items-center justify-center',
        'transition-all duration-200',
        isActive
          ? `${activeBg} ${color}`
          : 'text-zinc-500 group-hover:text-zinc-200 group-hover:bg-white/8',
      ].join(' ')}
    >
      <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
    </div>

    {/* Tooltip — appears on hover, to the right */}
    <div className="pointer-events-none absolute left-[calc(100%+10px)] z-[200]
                    opacity-0 group-hover:opacity-100
                    translate-x-1 group-hover:translate-x-0
                    transition-all duration-150
                    bg-zinc-800 text-white text-xs font-semibold
                    px-2.5 py-1.5 rounded-lg border border-zinc-700
                    shadow-xl whitespace-nowrap">
      {label}
      {/* Arrow */}
      <span className="absolute right-full top-1/2 -translate-y-1/2
                       border-4 border-transparent border-r-zinc-700" />
    </div>
  </Link>
);

/* ─── Mobile full-width drawer item ─── */
const DrawerItem = ({ to, label, icon: Icon, color, isActive }) => (
  <Link
    to={to}
    aria-current={isActive ? 'page' : undefined}
    className={[
      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-brand-500/15 text-brand-400 border border-brand-500/25'
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/6',
    ].join(' ')}
  >
    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-400' : color}`} strokeWidth={1.8} />
    {label}
  </Link>
);

/* ─── Main component ─── */
export const Sidenav = ({ menuset }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {menuset && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm sm:block hidden"
          />
        )}
      </AnimatePresence>

      {/* ── DESKTOP: compact icon rail ── */}
      <aside
        className={[
          'sm:hidden',                          // hide on mobile
          'w-[64px] h-screen shrink-0',
          'bg-[#0d0d0f] border-r border-white/[0.06]',
          'flex flex-col items-center',
          'py-4 gap-1',
          'sticky top-0 z-20',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Home"
          className="w-10 h-10 mb-4 rounded-xl bg-brand-600 flex items-center justify-center
                     shadow-glow-sm hover:scale-105 transition-transform duration-200 shrink-0"
        >
          <Clapperboard className="w-5 h-5 text-white" strokeWidth={2} />
        </Link>

        {/* Nav items */}
        <nav className="flex flex-col items-center gap-1 flex-1 w-full px-2.5">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isActive={pathname === item.to}
            />
          ))}
        </nav>

        {/* Sign in — pinned to bottom */}
        <div className="px-2.5 w-full mt-auto">
          <div className="border-t border-white/[0.06] pt-3">
            <NavItem
              to="/login"
              label="Sign In"
              icon={LogIn}
              color="text-rose-400"
              activeBg="bg-rose-500/15"
              isActive={pathname === '/login'}
            />
          </div>
        </div>
      </aside>

      {/* ── MOBILE: slide-in full drawer ── */}
      <motion.aside
        initial={false}
        animate={{ x: menuset ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        className={[
          'hidden sm:flex',                     // only on mobile
          'fixed top-0 left-0 z-50',
          'w-[72%] h-screen',
          'bg-[#0d0d0f] border-r border-white/[0.07]',
          'flex-col',
        ].join(' ')}
        aria-label="Mobile navigation"
      >
        {/* Logo row */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.07]">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow-sm">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">THE BIG SHOW</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Entertainment Hub</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <DrawerItem
              key={item.to}
              {...item}
              isActive={pathname === item.to}
            />
          ))}
        </nav>

        {/* Sign in + footer */}
        <div className="px-3 pb-6 border-t border-white/[0.07] pt-3 space-y-1">
          <DrawerItem
            to="/login"
            label="Sign In"
            icon={LogIn}
            color="text-rose-400"
            isActive={pathname === '/login'}
          />
          <p className="text-[10px] text-zinc-600 px-4 pt-2">
            Made with <span className="text-rose-500">♥</span> by Sachin Kumar
          </p>
        </div>
      </motion.aside>
    </>
  );
};
