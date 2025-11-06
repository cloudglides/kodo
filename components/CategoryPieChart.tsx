'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Category {
  name: string;
  total_seconds: number;
  percent: number;
}

interface CategoryPieChartProps {
  categories: Category[];
  title: string;
  subtitle: string;
}

const COLORS = [
  'rgba(255, 255, 255, 0.9)',
  'rgba(255, 255, 255, 0.7)',
  'rgba(255, 255, 255, 0.5)',
  'rgba(255, 255, 255, 0.3)',
  'rgba(255, 255, 255, 0.2)',
];

export function CategoryPieChart({ categories, title, subtitle }: CategoryPieChartProps) {
  const data = categories.slice(0, 5).map((cat) => ({
    name: cat.name,
    value: parseFloat(cat.percent.toFixed(1)),
    hours: (cat.total_seconds / 3600).toFixed(1),
  }));

  return (
    <div className="rounded-xl bg-black/40 p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <div>
          <h3 className="text-2xl font-bold text-white tracking-wider">{title}</h3>
          <p className="text-white/40 text-xs font-mono">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <ResponsiveContainer width="45%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-white/80 text-sm font-mono group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white font-bold text-sm tabular-nums">{item.value}%</span>
                <span className="text-white/40 text-xs font-mono">{item.hours}h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
