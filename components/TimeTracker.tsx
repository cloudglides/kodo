'use client';

import { Pause, Play, Square, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TimeTracker() {
  const [seconds, setSeconds] = useState(5048);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="relative bg-gradient-to-br from-coral-600 via-coral-500 to-orange-500 rounded-3xl p-8 text-white overflow-hidden shadow-2xl shadow-coral-500/40 animate-pulse-glow">
      {/* Animated background shapes */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
      <div className="absolute right-20 bottom-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
            <Timer className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">Live Session</h3>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-7xl font-bold tabular-nums tracking-tight mb-2">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(secs)}
          </p>
          <p className="text-white/80 text-sm font-medium">Time coding today</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            {isRunning ? (
              <Pause className="w-7 h-7" fill="white" />
            ) : (
              <Play className="w-7 h-7" fill="white" />
            )}
          </button>
          <button 
            onClick={() => setSeconds(0)}
            className="w-16 h-16 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
          >
            <Square className="w-6 h-6" fill="white" />
          </button>
        </div>

        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
          <p className="text-sm text-center text-white/90">
            Keep up the great work! 🔥
          </p>
        </div>
      </div>
    </div>
  );
}
