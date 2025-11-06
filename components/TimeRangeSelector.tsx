'use client';

interface TimeRangeSelectorProps {
  selected: string;
  onChange: (range: string) => void;
}

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  const ranges = ['7D', '30D', '6M', '1Y'];

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-white/5 border border-white/10">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-all duration-300 ${
            selected === range
              ? 'bg-white text-black'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
