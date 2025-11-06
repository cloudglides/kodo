'use client';

import { TrendingUp } from 'lucide-react';

interface WeeklyChartProps {
  data: Array<{ day: string; hours: number }>;
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const maxHours = Math.max(...data.map(d => d.hours), 1);
  
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-coral-100 to-transparent rounded-full blur-3xl opacity-40" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Weekly Activity</h3>
            <p className="text-gray-500 text-sm">Your coding hours over the week</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full shadow-lg shadow-coral-500/30">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+12%</span>
          </div>
        </div>
        
        <div className="flex items-end justify-between gap-3 h-72">
          {data.map((item, index) => {
            const heightPercent = (item.hours / maxHours) * 100;
            const isActive = item.hours > 0;
            
            const colors = [
              'from-purple-500 to-purple-600',
              'from-blue-500 to-blue-600',
              'from-cyan-500 to-cyan-600',
              'from-coral-500 to-coral-600',
              'from-orange-500 to-orange-600',
              'from-pink-500 to-pink-600',
              'from-rose-500 to-rose-600',
            ];
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full relative">
                  <div 
                    className={`w-full rounded-2xl transition-all duration-500 hover:scale-105 ${
                      isActive 
                        ? `bg-gradient-to-t ${colors[index]} shadow-lg` 
                        : 'bg-gradient-to-t from-gray-100 to-gray-200'
                    }`}
                    style={{ 
                      height: `${heightPercent}%`,
                      minHeight: '40px'
                    }}
                  />
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-3 py-2 rounded-lg font-semibold whitespace-nowrap shadow-xl">
                    {item.hours.toFixed(1)} hours
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
