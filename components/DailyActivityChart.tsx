'use client';

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyData {
  date: string;
  hours: number;
  day: string;
}

interface DailyActivityChartProps {
  data: DailyData[];
}

export function DailyActivityChart({ data }: DailyActivityChartProps) {
  return (
    <div className="relative rounded-xl bg-black/40 p-6 backdrop-blur-xl border border-white/20 overflow-hidden group hover:border-white/40 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <h3 className="text-2xl font-bold text-white tracking-wider">Daily Activity</h3>
            </div>
            <p className="text-white/40 text-xs font-mono">7-day coding trend</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded text-white/60 text-xs font-mono">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Live
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              label={{ value: 'HOURS', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                backdropFilter: 'blur(20px)',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="hours" 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth={2}
              fill="url(#areaGradient)"
              activeDot={{ r: 6, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
