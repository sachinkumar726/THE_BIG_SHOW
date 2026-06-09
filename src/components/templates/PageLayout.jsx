import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Topnav } from './Topnav';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Shared layout for list pages (Trending, Popular, Movie, TV, People).
 * Props:
 *  - title: string
 *  - subtitle: string (optional)
 *  - icon: Lucide component (optional)
 *  - controls: ReactNode (dropdowns etc.)
 *  - children: page content
 */
export const PageLayout = ({ title, subtitle, icon: Icon, controls, children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-surface-base">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-surface-base/90 backdrop-blur-md border-b border-surface-border">
        <div className="flex items-center gap-3 px-4 py-2">
          <button
            onClick={() => navigate('/')}
            aria-label="Back to home"
            className="btn btn-icon btn-ghost text-content-secondary shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {Icon && (
              <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center">
                <Icon className="w-4 h-4 text-brand-400" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-content-primary leading-none">{title}</h1>
              {subtitle && (
                <p className="text-2xs text-content-disabled mt-0.5 capitalize">{subtitle}</p>
              )}
            </div>
          </div>

          <Topnav />

          {controls && (
            <div className="flex items-center gap-2 shrink-0 pr-2">
              {controls}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
