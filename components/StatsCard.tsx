import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          {trend && (
            <span className="text-xs font-medium text-white/60 px-3 py-1 rounded-full bg-white/5">
              {trend}
            </span>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-white/60 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        </div>
      </div>
      
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
    </div>
  );
}
