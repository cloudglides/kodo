'use client';

interface SimpleChartProps {
  data: Array<{ day: string; hours: number }>;
}

export function SimpleChart({ data }: SimpleChartProps) {
  const maxHours = Math.max(...data.map(d => d.hours), 1);
  
  return (
    <div className="bg-primary border border-[#1a1c1a] rounded-lg p-6">
      <h3 className="text-[10px] font-medium text-[#929992] uppercase tracking-wider mb-6" style={{ lineHeight: '10px' }}>Activity</h3>
      
      <div className="flex items-end justify-between gap-3 h-40">
        {data.map((item, index) => {
          const heightPercent = (item.hours / maxHours) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full relative group">
                <div 
                  className="w-full rounded-sm bg-[#DE7356] hover:bg-[#f3937f] transition-colors"
                  style={{ 
                    height: `${heightPercent}%`,
                    minHeight: '4px'
                  }}
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0b0d0b] text-[#f6fff5] text-[10px] font-medium px-2 py-1.5 rounded border border-[#1a1c1a] whitespace-nowrap" style={{ lineHeight: '10px' }}>
                  {item.hours.toFixed(1)}h
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#929992]" style={{ lineHeight: '10px' }}>{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
