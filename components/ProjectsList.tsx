interface Project {
  name: string;
  percent: number;
  text: string;
}

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="bg-primary border border-[#1a1c1a] rounded-lg p-6">
      <h3 className="text-[10px] font-medium text-[#929992] uppercase tracking-wider mb-5" style={{ lineHeight: '10px' }}>Projects</h3>
      
      <div className="space-y-4">
        {projects.slice(0, 6).map((project, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-[#f6fff5] font-medium truncate">{project.name}</span>
              <span className="text-[#929992] text-[10px] font-medium ml-2 flex-shrink-0" style={{ lineHeight: '10px' }}>{project.text}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1a1c1a] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#DE7356] rounded-full transition-all duration-500"
                style={{ width: `${project.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
