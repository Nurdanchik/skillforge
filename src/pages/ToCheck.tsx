import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api/const';

const ToCheck = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects/company/to-check`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(response.data);
      } catch (err) {
        setError('Ошибка при получении проектов для проверки');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const markComplete = async (id: number) => {
    try {
      await axios.post(`${API_URL}/api/projects/company/complete/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(projects.filter((project: any) => project.id !== id));
    } catch (err) {
      alert('Ошибка при подтверждении проекта');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects to Review</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : projects.length === 0 ? (
        <p>No projects to check.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div key={project.id} className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                GitHub:{' '}
                <a
                  href={project.submissionLink}
                  className="text-indigo-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.submissionLink}
                </a>
              </p>
              <button
                onClick={() => markComplete(project.id)}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Подтвердить выполнение
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToCheck;