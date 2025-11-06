'use client';

import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  unit?: string;
  change?: string;
  glowColor?: string;
}

export function MetricCard({ label, value, icon: Icon, unit, change, glowColor = 'white' }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="group relative rounded-xl bg-black/40 p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden">
      <div className={`absolute inset-0 bg-${glowColor}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${glowColor}/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-white/10 border border-white/20">
            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          {change && (
            <span className="text-xs font-mono text-white/60 px-2 py-1 bg-white/10 rounded border border-white/20">
              {change}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-mono text-white/50 tracking-wider uppercase">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-white tabular-nums">
              {typeof value === 'string' ? value : displayValue.toFixed(1)}
            </p>
            {unit && <span className="text-lg text-white/40 font-mono">{unit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
