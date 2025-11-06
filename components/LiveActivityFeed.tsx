'use client';

import { Activity } from 'lucide-react';

interface ActivityItem {
  language: string;
  time: string;
  duration: string;
}

interface LiveActivityFeedProps {
  activities: ActivityItem[];
}

export function LiveActivityFeed({ activities }: LiveActivityFeedProps) {
  return (
    <div className="rounded-xl bg-black/40 p-6 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-white/10">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Recent Activity</h3>
          <p className="text-white/40 text-xs font-mono">Live coding sessions</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {activities.slice(0, 8).map((activity, index) => (
          <div
            key={index}
            className="group flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/60 group-hover:bg-white transition-colors" />
              <div>
                <p className="text-white font-medium text-sm">{activity.language}</p>
                <p className="text-white/40 text-xs font-mono">{activity.time}</p>
              </div>
            </div>
            <span className="text-white/60 text-sm font-mono">{activity.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
