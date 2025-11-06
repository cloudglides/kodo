import { Code2, Palette, Smartphone, Globe } from 'lucide-react';

interface Project {
  name: string;
  dueDate: string;
  icon: 'code' | 'palette' | 'smartphone' | 'globe';
  color: string;
}

interface ProjectListProps {
  projects: Project[];
}

const iconMap = {
  code: Code2,
  palette: Palette,
  smartphone: Smartphone,
  globe: Globe,
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          + New
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => {
          const Icon = iconMap[project.icon];
          
          return (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{project.name}</p>
                <p className="text-xs text-gray-500">Due: {project.dueDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
