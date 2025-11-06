'use client';

interface ProgressCircleProps {
  percentage: number;
  title: string;
}

export function ProgressCircle({ percentage, title }: ProgressCircleProps) {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
            <circle
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            <circle
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DE7356" />
                <stop offset="100%" stopColor="#f8baab" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-gray-900">{percentage}%</p>
            <p className="text-sm text-gray-500 mt-1">Goal Reached</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-coral-600" />
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-600">Remaining</span>
        </div>
      </div>
    </div>
  );
}
