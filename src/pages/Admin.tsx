import { useEffect, useState } from 'react';
import { Users, Briefcase, CreditCard, Settings, Search, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api/const';
import Modal from '../components/shared/Modal';
import CustomSelect from '../components/shared/CustomSelect';
import { useAuthErrorHandler } from '../hooks/useAuthErrorHandler';

const Admin = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const roles = localStorage.getItem('roles')
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([])

  const [error, setError] = useState(null);
  useAuthErrorHandler(error);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get(`${API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setUsers(res.data)
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  const getUser = async (userId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${API_URL}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setOpen(true);
    } catch (error) {
      console.log(error)
      setError(error);
      throw error;
    }
  };

  useEffect(() => {
    if (roles != 'ROLE_ADMIN') {
      navigate('/')
    } else {
      getUsers()
    }
  }, [])


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>

        <div className="p-6">
          <div>
            <div className="flex justify-start items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3  text-xs text-right font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td onClick={() => getUser(user.id)} className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td onClick={() => getUser(user.id)} className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm text-gray-500">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.roles[0].name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <CustomSelect userId={user.id} currentRole={user.roles[0].name} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {user && (
              <Modal isOpen={open} onClose={() => setOpen(false)} user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;