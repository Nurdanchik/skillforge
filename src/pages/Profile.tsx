import axios from 'axios';
import { Settings, Award, BookOpen, Star, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { API_URL } from '../api/const';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Ошибка при получении профиля', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!profile) return <div className="text-center py-8 text-red-500">Ошибка загрузки профиля</div>;

  const user = profile.user;
  const activeProjects = user.takenProjects.filter((p: any) => !p.completed).length;
  const completedProjects = user.completedProjects.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Settings className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">{completedProjects} Completed Projects</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">{activeProjects} Active Projects</span>
          </div>
          <div className="flex items-center">
            <Github className="h-5 w-5 text-gray-400" />
            <a href={profile.portfolioLink} target="_blank" rel="noreferrer" className="ml-2 text-sm text-indigo-600 hover:text-indigo-500">
              View GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Taken Projects</h2>
        <div className="space-y-4">
          {user.takenProjects.map((proj: any) => (
            <div key={proj.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{proj.title}</h3>
                <p className="text-sm text-gray-500">{proj.description}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  proj.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {proj.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;