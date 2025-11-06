'use client';

import { Flame } from 'lucide-react';

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-mono text-white/50 tracking-wider uppercase">Current Streak</p>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-bold text-white tabular-nums">{days}</p>
          <span className="text-lg text-orange-400 font-mono">days</span>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          {[...Array(Math.min(days, 7))].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
