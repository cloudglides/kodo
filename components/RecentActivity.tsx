import { Video } from 'lucide-react';

interface Activity {
  title: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Sessions</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm mb-1">{activity.title}</p>
                <p className="text-xs text-gray-500">Time: {activity.time}</p>
              </div>
            </div>
            {index === 0 && (
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-coral-600 to-coral-500 hover:from-coral-700 hover:to-coral-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-coral-500/30">
                <Video className="w-4 h-4" />
                Start Coding
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
