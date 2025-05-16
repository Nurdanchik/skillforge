import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api/const';
import { Link } from 'react-router-dom';

type Project = {
  id: number;
  title: string | null;
  description: string | null;
  type: string | null;
  stack: {
    level: string | null;
  };
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/api/projects/available`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(response.data);
    } catch (err: any) {
      console.error("Ошибка при загрузке проектов:", err);
      setError('Ошибка при получении проектов');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Доступные проекты</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded shadow border">
            <h2 className="text-xl font-semibold text-gray-900">
              {project.title || 'Без названия'}
            </h2>
            <p className="text-gray-600 mt-2">{project.description || 'Описание отсутствует'}</p>
            <p className="mt-1 text-sm text-gray-500">Тип: {project.type || 'Не указан'}</p>
            <p className="mt-1 text-sm text-gray-500">Уровень: {project.stack?.level || 'N/A'}</p>
            <Link to={`/projects/${project.id}`}>
              <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Смотреть
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;