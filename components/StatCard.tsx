import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
}

export function StatCard({ label, value, icon: Icon, change }: StatCardProps) {
  return (
    <div className="bg-primary border border-[#1a1c1a] rounded-lg p-5 hover:border-[#2a2c2a] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider" style={{ lineHeight: '10px' }}>{label}</span>
        <Icon className="w-4 h-4 text-text-muted" />
      </div>
      <div className="text-2xl font-medium text-white mb-1">{value}</div>
      {change && (
        <div className="text-[10px] font-medium text-text-muted" style={{ lineHeight: '10px' }}>{change}</div>
      )}
    </div>
  );
}
