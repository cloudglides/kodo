'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Editor {
  name: string;
  total_seconds: number;
  percent: number;
}

interface EditorsPieChartProps {
  editors: Editor[];
}

const COLORS = [
  'rgba(255, 255, 255, 0.9)',
  'rgba(255, 255, 255, 0.7)',
  'rgba(255, 255, 255, 0.5)',
  'rgba(255, 255, 255, 0.3)',
  'rgba(255, 255, 255, 0.2)',
];

export function EditorsPieChart({ editors }: EditorsPieChartProps) {
  const data = editors.map((editor) => ({
    name: editor.name,
    value: editor.percent,
  }));

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Editors</h3>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      
      <div className="flex items-center gap-8">
        <ResponsiveContainer width="50%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#fff',
                backdropFilter: 'blur(20px)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="flex-1 space-y-3">
          {editors.map((editor, index) => (
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                  {editor.name}
                </span>
              </div>
              <span className="text-white font-semibold text-sm">
                {editor.percent.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
