'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Language {
  name: string;
  total_seconds: number;
  percent: number;
  text: string;
}

interface LanguageChartProps {
  languages: Language[];
}

export function LanguageChart({ languages }: LanguageChartProps) {
  const data = languages.slice(0, 8).map((lang) => ({
    name: lang.name,
    hours: parseFloat((lang.total_seconds / 3600).toFixed(1)),
    percent: lang.percent,
  }));

  return (
    <div className="group rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Languages</h3>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#fff',
              backdropFilter: 'blur(20px)',
            }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar 
            dataKey="hours" 
            fill="url(#barGradient)" 
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
