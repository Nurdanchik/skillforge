import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Menu } from 'lucide-react';

const Navbar = () => {
  const [userRoles, setUserRoles] = useState('/profile');
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const storedRole = localStorage.getItem('roles');

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setRole(storedRole || '');

    switch (storedRole) {
      case 'ROLE_ADMIN':
        setUserRoles('/admin');
        break;
      case 'ROLE_COMPANY':
        setUserRoles('/company');
        break;
      default:
        setUserRoles('/profile');
        break;
    }
  }, [storedRole]);

  const handleLogout = () => {
    localStorage.clear(); // удалить все
    navigate('/login');   // перенаправить
  };

  const renderLinks = () => {
    if (role === 'ROLE_ADMIN') {
      return (
        <Link to="/admin" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
          Admin Panel
        </Link>
      );
    }

    if (role === 'ROLE_COMPANY') {
      return (
        <>
          <Link to="/company" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
            Projects
          </Link>
          <Link to="/toCheck" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
            To Check
          </Link>
        </>
      );
    }

    if (role === 'ROLE_USER') {
      return (
        <>
          <Link to="/projects" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
            Projects
          </Link>
          <Link to="/taken" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
            Taken
          </Link>
          <Link to="/pricing" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
            Pricing
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SkillForge</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {renderLinks()}
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to={userRoles}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {username}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center sm:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-900" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="sm:hidden pt-2 pb-3 space-y-1">
            {renderLinks()}
            <Link
              to={userRoles}
              onClick={toggleMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {username}
            </Link>
            <button
              onClick={() => { toggleMenu(); handleLogout(); }}
              className="block px-3 py-2 text-base font-medium text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;