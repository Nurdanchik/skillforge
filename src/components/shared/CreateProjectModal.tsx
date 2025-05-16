import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/const';
import toast from 'react-hot-toast';

const initialForm = {
    githubLink: '',
    title: '',
    description: '',
    type: '',
    technologies: [{ name: '' }],
    requirements: [{ description: '' }],
    outcomes: [{ description: '' }],
    stack: { level: '', details: '' }
};

const CreateProjectModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (key, index, field, value) => {
        const updated = [...form[key]];
        updated[index][field] = value;
        setForm((prev) => ({ ...prev, [key]: updated }));
    };

    const addField = (key, template) => {
        setForm((prev) => ({ ...prev, [key]: [...prev[key], template] }));
    };

    const removeField = (key, index) => {
        const updated = [...form[key]];
        updated.splice(index, 1);
        setForm((prev) => ({ ...prev, [key]: updated }));
    };

    const handleStackChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            stack: { ...prev.stack, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(`${API_URL}/api/projects`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setForm(initialForm);
            toast.success('successful create')
            onClose();
        } catch (err) {
            console.error('Ошибка при создании проекта:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4">Создание проекта</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Название проекта"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        name="githubLink"
                        value={form.githubLink}
                        onChange={handleChange}
                        placeholder="GitHub ссылка"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="Тип проекта (Backend/Frontend)"
                        className="w-full border p-2 rounded"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Описание"
                        className="w-full border p-2 rounded"
                    />

                    {/* Технологии */}
                    <div>
                        <p className="font-semibold">Технологии</p>
                        {form.technologies.map((tech, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    value={tech.name}
                                    onChange={(e) =>
                                        handleArrayChange('technologies', index, 'name', e.target.value)
                                    }
                                    className="flex-1 border p-2 rounded"
                                    placeholder={`Технология #${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField('technologies', index)}
                                    className="text-red-500"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addField('technologies', { name: '' })}
                            className="text-blue-500 text-sm"
                        >
                            ➕ Добавить технологию
                        </button>
                    </div>

                    {/* Требования */}
                    <div>
                        <p className="font-semibold">Требования</p>
                        {form.requirements.map((req, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    value={req.description}
                                    onChange={(e) =>
                                        handleArrayChange('requirements', index, 'description', e.target.value)
                                    }
                                    className="flex-1 border p-2 rounded"
                                    placeholder={`Требование #${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField('requirements', index)}
                                    className="text-red-500"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addField('requirements', { description: '' })}
                            className="text-blue-500 text-sm"
                        >
                            ➕ Добавить требование
                        </button>
                    </div>

                    {/* Ожидаемые результаты */}
                    <div>
                        <p className="font-semibold">Результаты</p>
                        {form.outcomes.map((out, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    value={out.description}
                                    onChange={(e) =>
                                        handleArrayChange('outcomes', index, 'description', e.target.value)
                                    }
                                    className="flex-1 border p-2 rounded"
                                    placeholder={`Результат #${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField('outcomes', index)}
                                    className="text-red-500"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addField('outcomes', { description: '' })}
                            className="text-blue-500 text-sm"
                        >
                            ➕ Добавить результат
                        </button>
                    </div>

                    {/* Стек */}
                    <div>
                        <p className="font-semibold">Стек</p>
                        <input
                            name="level"
                            value={form.stack.level}
                            onChange={handleStackChange}
                            placeholder="Уровень (Beginner / Intermediate / Advanced)"
                            className="w-full border p-2 rounded mb-2"
                        />
                        <textarea
                            name="details"
                            value={form.stack.details}
                            onChange={handleStackChange}
                            placeholder="Описание стека"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;
