interface Language {
  name: string;
  percent: number;
  text: string;
}

interface LanguagesListProps {
  languages: Language[];
}

export function LanguagesList({ languages }: LanguagesListProps) {
  return (
    <div className="bg-primary border border-[#1a1c1a] rounded-lg p-6">
      <h3 className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-5" style={{ lineHeight: '10px' }}>Languages</h3>
      
      <div className="space-y-4">
        {languages.slice(0, 5).map((lang, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-300 font-medium">{lang.name}</span>
              <span className="text-text-muted text-[10px] font-medium" style={{ lineHeight: '10px' }}>{lang.text}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1a1c1a] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#DE7356] rounded-full transition-all duration-500"
                style={{ width: `${lang.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
