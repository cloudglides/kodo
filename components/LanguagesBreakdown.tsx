'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Language {
  name: string;
  total_seconds: number;
  percent: number;
  text: string;
}

interface LanguagesBreakdownProps {
  languages: Language[];
}

export function LanguagesBreakdown({ languages }: LanguagesBreakdownProps) {
  const data = languages.slice(0, 10).map((lang, idx) => ({
    name: lang.name,
    hours: parseFloat((lang.total_seconds / 3600).toFixed(1)),
    percent: lang.percent,
    index: idx,
  }));

  const getBarColor = (index: number) => {
    const opacity = 90 - (index * 7);
    return `rgba(255, 255, 255, ${opacity / 100})`;
  };

  return (
    <div className="rounded-xl bg-black/40 p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <h3 className="text-2xl font-bold text-white tracking-wider">Languages</h3>
          </div>
          <p className="text-white/40 text-xs font-mono">Time spent by language</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
          <XAxis 
            type="number"
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <YAxis 
            type="category"
            dataKey="name"
            stroke="rgba(255,255,255,0.5)" 
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            width={100}
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
          <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
