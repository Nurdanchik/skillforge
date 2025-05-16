import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api/const';
import { Dialog } from '@headlessui/react';

const TakenProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects/taken`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProjects(res.data))
      .catch(() => alert('Ошибка при получении взятых проектов'));
  }, []);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsOpen(true);
    setShowSubmit(false);
    setSubmissionLink('');
  };

  const handleSubmit = async (id: number) => {
    try {
      await axios.post(`${API_URL}/api/projects/${id}/submit`, submissionLink, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
        },
      });
      alert('Проект отправлен!');
      setShowSubmit(false);
      setSubmissionLink('');
    } catch (error) {
      alert('Ошибка при отправке проекта');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Мои взятые проекты</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="bg-white p-4 shadow rounded cursor-pointer hover:bg-gray-50"
            onClick={() => openModal(project)}
          >
            {project.title}
          </li>
        ))}
      </ul>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded shadow-lg p-6 max-w-md w-full space-y-4">
            <Dialog.Title className="text-lg font-bold">{selectedProject?.title}</Dialog.Title>
            <p className="text-gray-700">{selectedProject?.description}</p>

            {selectedProject?.githubLink && (
              <p className="text-sm text-gray-500">
                GitHub:&nbsp;
                <a
                  href={selectedProject.githubLink.startsWith('http') ? selectedProject.githubLink : `https://${selectedProject.githubLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  {selectedProject.githubLink}
                </a>
              </p>
            )}

            <div>
              <h3 className="font-semibold">Stack</h3>
              <p>{selectedProject?.stack?.details}</p>
            </div>

            <div>
              <h3 className="font-semibold">Technologies</h3>
              <ul className="list-disc pl-5">
                {selectedProject?.technologies?.map((tech: any) => (
                  <li key={tech.id}>{tech.name}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowSubmit(!showSubmit)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {showSubmit ? 'Отменить' : 'Отправить проект'}
            </button>

            {showSubmit && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="Вставьте GitHub ссылку"
                  className="w-full border px-3 py-2 rounded"
                />
                <button
                  onClick={() => handleSubmit(selectedProject.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Подтвердить
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TakenProjects;