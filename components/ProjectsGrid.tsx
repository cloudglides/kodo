import { Code2, Palette, Smartphone, Globe, Clock } from 'lucide-react';

interface Project {
  name: string;
  percent: number;
  text: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

const icons = [Code2, Palette, Smartphone, Globe];
const gradients = [
  'from-blue-500 to-blue-600',
  'from-coral-500 to-coral-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Active Projects</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {projects.slice(0, 4).map((project, index) => {
          const Icon = icons[index % icons.length];
          const gradient = gradients[index % gradients.length];
          
          return (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100 hover:border-coral-200 transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              
              <h4 className="font-bold text-gray-900 mb-2 truncate">{project.name}</h4>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock className="w-4 h-4" />
                <span>{project.text}</span>
              </div>
              
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
                  style={{ width: `${project.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
