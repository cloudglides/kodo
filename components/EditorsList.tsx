interface Editor {
  name: string;
  percent: number;
  text: string;
}

interface EditorsListProps {
  editors: Editor[];
}

export function EditorsList({ editors }: EditorsListProps) {
  return (
    <div className="bg-primary border border-[#1a1c1a] rounded-lg p-6">
      <h3 className="text-[10px] font-medium text-[#929992] uppercase tracking-wider mb-5" style={{ lineHeight: '10px' }}>Editors</h3>
      
      <div className="space-y-4">
        {editors.slice(0, 3).map((editor, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-[#f6fff5] font-medium">{editor.name}</span>
            <span className="text-[#929992] text-[10px] font-medium" style={{ lineHeight: '10px' }}>{editor.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
