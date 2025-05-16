// Modal.tsx
import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">User Info</h2>
                <div className="space-y-2">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    <div>
                        <h3 className="font-semibold mt-4">Roles:</h3>
                        <ul className="list-disc pl-5">
                            {user.roles?.map((role: any) => (
                                <li key={role.id}>{role.name}</li>
                            ))}
                        </ul>
                    </div>

                    {['takenProjects', 'createdProjects', 'completedProjects'].map((key) => (
                        <div key={key}>
                            <h3 className="font-semibold mt-4">{key}:</h3>
                            <ul className="list-disc pl-5">
                                {user[key]?.map((proj: any) => (
                                    <li key={proj.id}>
                                        <p><strong>Title:</strong> {proj.title}</p>
                                        <p><strong>Description:</strong> {proj.description}</p>
                                        <p><strong>GitHub:</strong> {proj.githubLink}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
