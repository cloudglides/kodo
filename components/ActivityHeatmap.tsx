'use client';

interface HeatmapDay {
  date: string;
  hours: number;
  day: string;
}

interface ActivityHeatmapProps {
  data: HeatmapDay[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const getIntensity = (hours: number) => {
    if (hours === 0) return 'bg-white/5';
    if (hours < 2) return 'bg-white/20';
    if (hours < 4) return 'bg-white/40';
    if (hours < 6) return 'bg-white/60';
    return 'bg-white/90';
  };

  return (
    <div className="rounded-xl bg-black/40 p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <h3 className="text-2xl font-bold text-white tracking-wider">Activity Heatmap</h3>
      </div>
      
      <div className="grid grid-cols-7 gap-3">
        {data.map((day, index) => (
          <div key={index} className="group relative">
            <div className={`aspect-square rounded-lg ${getIntensity(day.hours)} border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-white/40`}>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-white/80 text-xs font-mono font-bold">{day.day}</span>
                <span className="text-white/40 text-[10px] font-mono">{day.hours.toFixed(1)}h</span>
              </div>
            </div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 px-2 py-1 rounded text-xs text-white/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {day.date}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <span className="text-white/40 text-xs font-mono">Intensity scale</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs font-mono">Low</span>
          {[5, 20, 40, 60, 90].map((opacity, i) => (
            <div key={i} className={`w-4 h-4 rounded bg-white/${opacity}`} />
          ))}
          <span className="text-white/30 text-xs font-mono">High</span>
        </div>
      </div>
    </div>
  );
}
