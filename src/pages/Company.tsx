import { useEffect, useState } from 'react';
import { Users, Briefcase, CreditCard, Settings, Search, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/const';
import Modal from '../components/shared/Modal';
import CustomSelect from '../components/shared/CustomSelect';
import { useAuthErrorHandler } from '../hooks/useAuthErrorHandler';
import CreateProjectModal from '../components/shared/CreateProjectModal';

const Company = () => {
    const navigate = useNavigate()
    const roles = localStorage.getItem('roles')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [error, setError] = useState(null);
    useAuthErrorHandler(error);

    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const res = await axios.get(`${API_URL}/api/projects/available`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            setProjects(res.data)
        } catch (error) {
            setError(error)
            throw error
        }
    }

    useEffect(() => {
        if (roles != 'ROLE_COMPANY') {
            navigate('/')
        } else {
            getProjects()
        }
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
                    </div>
                </div>

                <div className="p-6">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-medium text-gray-900">Projects</h2>
                            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Add Project
                            </button>
                            <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Github
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{project.title === null ? 'No data' : project.title}</div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {project.type === null ? 'No data' : project.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className={`rounded-full p-2 w-4 h-4 ${project.completed === false
                                                    ? 'bg-red-500'
                                                    : 'bg-green-500'
                                                    }`}>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {project.githubLink === null ? 'No link' : project.githubLink}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Company;