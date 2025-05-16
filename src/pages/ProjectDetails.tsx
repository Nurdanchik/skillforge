import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Clock, Users, BarChart, Github } from 'lucide-react';
import { API_URL } from '../api/const';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [taken, setTaken] = useState<boolean>(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_URL}/api/projects/available`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const found = response.data.find((p: any) => p.id === parseInt(id || ''));
        setProject(found);
        setTaken(found?.taken || false);
      } catch (err: any) {
        setError('Ошибка при загрузке проекта');
      }
    };

    fetchProject();
  }, [id]);

  const handleTakeProject = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_URL}/api/projects/${id}/take`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTaken(true);
    } catch (err) {
      alert('Ошибка при взятии проекта');
    }
  };

  if (!project) {
    return <p className="text-center text-red-500 mt-10">Проект не найден или произошла ошибка</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="mt-4 text-gray-600">{project.description}</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">{project.stack?.level || 'Level N/A'}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">{project.type || 'Тип не указан'}</span>
          </div>
          <div className="flex items-center">
            <BarChart className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">{project.stack?.details || 'Details not available'}</span>
          </div>
        </div>

        <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Технологии</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any) => (
                  <span key={tech.id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tech.name}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Требования</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {project.requirements.map((req: any) => (
                  <li key={req.id}>{req.description}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Результаты обучения</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {project.outcomes.map((outcome: any) => (
                  <li key={outcome.id}>{outcome.description}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Действия</h3>
              {!taken ? (
                <button
                  onClick={handleTakeProject}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 mb-4"
                >
                  Взять проект
                </button>
              ) : (
                <p className="text-green-600 text-sm font-medium">Вы уже взяли этот проект</p>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub проекта
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;