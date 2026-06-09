import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Dropdown = ({ title, options, func }) => {
  return (
    <div className="relative inline-flex items-center">
      <select
        defaultValue="0"
        onChange={func}
        aria-label={title}
        className={[
          'appearance-none bg-surface-muted border border-surface-border text-content-secondary',
          'text-sm font-medium rounded-lg pl-3 pr-8 py-2',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
          'hover:border-zinc-500 hover:text-content-primary',
          'cursor-pointer transition-all duration-200',
        ].join(' ')}
      >
        <option value="0" disabled className="bg-surface-overlay">
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o} className="bg-surface-overlay capitalize">
            {o.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-content-tertiary pointer-events-none" />
    </div>
  );
};
