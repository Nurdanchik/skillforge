import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/const';

const CustomSelect = ({ userId, currentRole }) => {
    const roles = ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COMPANY'];
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(currentRole);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = async (option) => {
        setSelected(option)
        setIsOpen(false);
        setIsLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`${API_URL}/api/admin/users/${userId}/roles`,
                [option],// пример: дать пользователю только роль USER
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(`Роль пользователя ${userId} обновлена на ${option}`);
        } catch (err) {
            console.error('Ошибка при обновлении роли:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className="inline-flex justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
                {selected}
                <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    {roles.map((role) => (
                        <div
                            key={role}
                            onClick={() => handleSelect(role)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            {role}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
